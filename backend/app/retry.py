"""Manual retry script for pending notifications.

Run via:
    python -m app.retry
"""

import asyncio
import logging
from app.leads import (
    get_pending_leads,
    update_lead_auto_reply_sent,
    update_lead_notified_team,
)
from app.notify.email import send_auto_reply_email, send_team_email
from app.notify.telegram import send_telegram_alert

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("retry")


async def retry_pending_leads() -> None:
    pending = get_pending_leads()
    if not pending:
        logger.info("No pending leads found with un-dispatched notifications.")
        return

    logger.info("Found %d pending lead(s) needing notification dispatch.", len(pending))

    for lead in pending:
        lead_id = str(lead.get("id"))
        notified_team = lead.get("notified_team", False)
        auto_reply_sent = lead.get("auto_reply_sent", False)

        logger.info(
            "Processing retry for lead_id=%s (notified_team=%s, auto_reply_sent=%s)",
            lead_id,
            notified_team,
            auto_reply_sent,
        )

        # Retry Telegram & Team Email if notified_team is False
        if not notified_team:
            tg_success = await send_telegram_alert(lead)
            if tg_success:
                update_lead_notified_team(lead_id, True)
                logger.info("Retry succeeded: Telegram alert dispatched for lead_id=%s", lead_id)
            else:
                logger.warning("Retry failed: Telegram alert failed for lead_id=%s", lead_id)

            await send_team_email(lead)

        # Retry auto-reply if auto_reply_sent is False
        if not auto_reply_sent:
            reply_success = await send_auto_reply_email(lead)
            if reply_success:
                update_lead_auto_reply_sent(lead_id, True)
                logger.info("Retry succeeded: Auto-reply dispatched for lead_id=%s", lead_id)
            else:
                logger.warning("Retry failed: Auto-reply failed for lead_id=%s", lead_id)

    logger.info("Completed notification retry run.")


def main() -> None:
    asyncio.run(retry_pending_leads())


if __name__ == "__main__":
    main()
