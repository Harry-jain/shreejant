"use client";

import React from "react";
import { MessageSquare, CheckCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { FadeUp } from "./FadeUp";

export interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  time?: string;
  actionButton?: {
    label: string;
    href?: string;
  };
}

export interface WhatsAppChatMockupProps {
  badge?: string;
  heading: string;
  description?: string;
  bullets: string[];
  brandName: string;
  messages: ChatMessage[];
  accentColor?: string;
  bgColor?: string;
  surfaceColor?: string;
  textColor?: string;
  phone?: string;
}

export function WhatsAppChatMockup({
  badge = "24/7 AI SALES CONCIERGE",
  heading,
  description,
  bullets,
  brandName,
  messages,
  accentColor = "#25D366",
  bgColor,
  surfaceColor,
  textColor,
  phone = "919999999999",
}: WhatsAppChatMockupProps) {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left / Editorial Info */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <FadeUp>
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-4"
                style={{
                  backgroundColor: `${accentColor}18`,
                  color: accentColor,
                  border: `1px solid ${accentColor}35`,
                }}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{badge}</span>
              </div>

              <h2
                className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.12] mb-4"
                style={{ color: textColor || "inherit" }}
              >
                {heading}
              </h2>

              {description && (
                <p className="font-body text-base sm:text-lg opacity-80 leading-relaxed mb-6">
                  {description}
                </p>
              )}

              {/* Two Supporting Bullets */}
              <div className="space-y-3.5 mb-8 w-full">
                {bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${accentColor}25`, color: accentColor }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-body text-sm sm:text-base opacity-90 leading-snug">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent("Hi! I'd like to test the live AI assistant.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-heading font-bold text-sm text-white shadow-lg hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
                style={{ backgroundColor: accentColor }}
              >
                <span>Test Live WhatsApp Flow</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </FadeUp>
          </div>

          {/* Right: Realistic WhatsApp Mobile Frame */}
          <div className="lg:col-span-6 flex justify-center">
            <FadeUp delay={0.15} className="w-full max-w-[390px]">
              <div className="rounded-[32px] p-3 sm:p-4 bg-[#111B21] border-2 border-white/10 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.65)] select-none">
                
                {/* Phone Speaker Notch & Camera */}
                <div className="flex justify-center mb-2">
                  <div className="w-20 h-3.5 rounded-full bg-black/60 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                </div>

                {/* WhatsApp Chat Header */}
                <div className="flex items-center justify-between pb-3 px-1 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      <MessageSquare className="w-5 h-5 fill-white" />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#111B21]" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-xs text-white leading-tight">
                        {brandName}
                      </h4>
                      <span className="font-mono text-[10px] text-emerald-400 block leading-none">
                        ● Verified Business Account
                      </span>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-mono text-white/70">
                    Cloud API
                  </div>
                </div>

                {/* Chat Background & Message Bubbles */}
                <div className="py-4 px-1 min-h-[300px] flex flex-col justify-end gap-3 bg-[#0B141A] rounded-2xl my-2 p-3">
                  <div className="text-center my-1">
                    <span className="font-mono text-[9px] px-2.5 py-0.5 rounded-full bg-[#182229] text-white/50">
                      TODAY
                    </span>
                  </div>

                  {messages.map((msg, i) => {
                    const isUser = msg.sender === "user";
                    return (
                      <div
                        key={i}
                        className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[85%] p-2.5 sm:p-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                            isUser
                              ? "bg-[#005C4B] text-white rounded-tr-sm"
                              : "bg-[#202C33] text-white/95 rounded-tl-sm border border-white/5"
                          }`}
                        >
                          <p>{msg.text}</p>
                          <div className="flex items-center justify-end gap-1 mt-1 text-[8px] font-mono text-white/50">
                            <span>{msg.time || "10:32 AM"}</span>
                            {isUser && <CheckCheck className="w-3 h-3 text-[#53BDEB]" />}
                          </div>
                        </div>

                        {msg.actionButton && (
                          <a
                            href={msg.actionButton.href || "#booking"}
                            className="mt-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-white shadow transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-1"
                            style={{ backgroundColor: accentColor }}
                          >
                            <span>{msg.actionButton.label}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* WhatsApp Chat Input Bar */}
                <div className="flex items-center gap-2 pt-1 px-1">
                  <div className="flex-1 h-9 rounded-full bg-[#2A3942] px-3 flex items-center text-xs text-white/40 font-body">
                    Type a message...
                  </div>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhatsAppChatMockup;

