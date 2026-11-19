'use client';

import React from 'react';
import Image from 'next/image';
import { Linkedin, Github } from 'lucide-react';
import { Member } from '@/data/team';
import { useLanguage } from '@/i18n';
import { TeamCharacter } from './CharacterArt';

export interface TeamCardProps {
  member: Member;
  featured?: boolean;
}

export function TeamCard({ member, featured = false }: TeamCardProps) {
  const { t } = useLanguage();

  const photoAlt = t('team.photo_alt', { name: member.name }) || `Portrait of ${member.name}`;

  const panelStyles = {
    slate: 'bg-[#263D59] text-white',
    brightGold: 'bg-[#7C5CFC] text-white',
    goldTint: 'bg-[#7C5CFC]/20 text-white',
  }[member.panelColor || 'slate'];

  // Alternating tilt for role sticker
  const roleTilt = member.id === 'harsh' ? 'rotate-[2deg]' : '-rotate-[2deg]';

  // Ask me about topic: owner data if present, otherwise default to first skill
  const askMeTopic = member.askMe || (member.skills && member.skills[0]) || '';

  return (
    <div
      className={`group relative w-full rounded-[14px] border-2 border-brand-text bg-brand-bg shadow-[6px_6px_0_#7C5CFC] overflow-hidden flex transition-transform ${
        featured ? 'flex-col md:flex-row h-full' : 'flex-col h-full'
      }`}
    >
      {/* Portrait / Character Panel */}
      <div
        className={`relative shrink-0 overflow-hidden border-b-2 md:border-b-0 ${
          featured
            ? 'md:border-r-2 md:w-[38%] min-h-[220px] md:min-h-full'
            : 'aspect-[16/10] sm:aspect-[16/11]'
        } border-brand-text ${panelStyles} flex items-center justify-center p-4`}
      >
        {member.photo ? (
          <Image
            src={member.photo.src}
            width={member.photo.width || 800}
            height={member.photo.height || 800}
            alt={photoAlt}
            sizes={featured ? '(max-width: 768px) 100vw, 400px' : '(max-width: 768px) 100vw, 360px'}
            className="w-full h-full object-cover"
          />
        ) : (
          <TeamCharacter
            character={member.character || 'designer'}
            className={featured ? 'w-auto h-40 sm:h-48' : 'w-auto h-36 sm:h-40'}
          />
        )}
      </div>

      {/* Text Details Block */}
      <div
        className={`flex flex-col justify-between flex-1 ${
          featured ? 'p-6 sm:p-8 space-y-5' : 'p-6 space-y-4'
        }`}
      >
        <div className="space-y-3.5">
          {/* Name & Role Sticker Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <h3
              className={`font-heading font-bold text-brand-text tracking-tight ${
                featured ? 'text-2xl sm:text-[28px]' : 'text-xl sm:text-2xl'
              }`}
            >
              {member.name}
            </h3>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#7C5CFC] text-white border-2 border-[#0A1628] shadow-[2px_2px_0_#0A1628] transition-transform ${roleTilt}`}
            >
              {member.roleKey}
            </span>
          </div>

          {/* Bio */}
          <p className="font-body text-[15px] text-brand-text leading-[1.65]">
            {member.bioKey}
          </p>

          {/* Ask me about speech bubble */}
          {askMeTopic && (
            <div className="pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-[#FFF3CD] border-2 border-[#0A1628] text-xs shadow-[2px_2px_0_#0A1628] relative">
                <span className="font-bold text-[#0A1628]">{t('team.ask_me')}</span>
                <span className="text-[#0A1628]">{askMeTopic}</span>
                <span
                  className="absolute -bottom-1.5 left-4 w-2 h-2 bg-[#FFF3CD] border-r-2 border-b-2 border-[#0A1628] rotate-45"
                  aria-hidden="true"
                />
              </div>
            </div>
          )}

          {/* Side quest (Friendly line, hidden when null per honesty rule) */}
          {member.sideQuest && (
            <p className="font-body text-xs text-brand-text/80 italic">
              <span className="font-bold not-italic text-brand-text mr-1">
                {t('team.side_quest')}
              </span>
              {member.sideQuest}
            </p>
          )}
        </div>

        {/* Powers & Social Links */}
        <div className="pt-4 border-t-2 border-brand-text/10 space-y-4">
          {/* Powers (skills chips with 2px navy outline, cream fill, 13px) */}
          {member.skills && member.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {member.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2.5 py-1 rounded-[8px] text-[13px] font-body font-semibold text-[#0A1628] border-2 border-[#0A1628] bg-brand-bg select-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Link Buttons (min 44x44px touch target) */}
          <div className="flex items-center gap-2.5">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  t('team.link_label', { network: 'LinkedIn', name: member.name }) ||
                  `LinkedIn profile of ${member.name}`
                }
                className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-[8px] border-2 border-brand-text bg-brand-bg text-brand-text hover:bg-brand-text hover:text-brand-bg flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC]"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}

            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  t('team.link_label', { network: 'GitHub', name: member.name }) ||
                  `GitHub profile of ${member.name}`
                }
                className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-[8px] border-2 border-brand-text bg-brand-bg text-brand-text hover:bg-brand-text hover:text-brand-bg flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC]"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
