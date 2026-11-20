"use client";

import React, { useState } from "react";
import { Play, RotateCcw, Check, ArrowRight, Zap, MessageSquare, Calendar, Database, Bell } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Step {
  id: number;
  label: string;
  icon: React.ElementType;
  description: string;
  system: string;
  payload: Record<string, string>;
}

const WORKFLOW_STEPS: Step[] = [
  {
    id: 1,
    label: "01. Lead Arrives",
    icon: Zap,
    description: "New visitor submits appointment inquiry on website or clicks Instagram bio link.",
    system: "Web Form Webhook",
    payload: {
      event: "lead.created",
      name: "Rohit Verma",
      phone: "+91 98201 XXXXX",
      interest: "Bridal Styling",
    },
  },
  {
    id: 2,
    label: "02. Instant WhatsApp",
    icon: MessageSquare,
    description: "Automated business WhatsApp sends immediate confirmation & interactive calendar options.",
    system: "WhatsApp Business API",
    payload: {
      template: "booking_inquiry_ack",
      status: "delivered_instantly",
      latency: "420ms",
    },
  },
  {
    id: 3,
    label: "03. Calendar Lock",
    icon: Calendar,
    description: "Client selects preferred slot. Time slot is reserved without double-booking risk.",
    system: "Calendar Sync Engine",
    payload: {
      slot: "Saturday, 3:30 PM",
      practitioner: "Senior Stylist",
      status: "confirmed",
    },
  },
  {
    id: 4,
    label: "04. CRM Sync",
    icon: Database,
    description: "Customer profile, booking history, and intake notes are automatically appended to your CRM.",
    system: "Supabase / PostgreSQL",
    payload: {
      record_id: "usr_94821",
      customer_stage: "Active Booking",
      owner: "Front Desk Team",
    },
  },
  {
    id: 5,
    label: "05. Team Alert",
    icon: Bell,
    description: "Founder or front desk receives structured notification on Telegram or WhatsApp group.",
    system: "Internal Dispatch",
    payload: {
      notify_group: "Front Desk Mumbai",
      action_required: "Prepare Station 02",
    },
  },
];

export function AutomateThisQuest() {
  const [activeStep, setActiveStep] = useState<number>(3); // steps up to this are active
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const runSimulation = () => {
    setIsRunning(true);
    setActiveStep(1);
    let step = 1;
    const interval = setInterval(() => {
      step++;
      if (step <= 5) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 700);
  };

  const currentStepData = WORKFLOW_STEPS[Math.min(activeStep - 1, WORKFLOW_STEPS.length - 1)];

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-accent-lime/40 text-text font-semibold">
              Quest 002 // Workflow Simulator
            </span>
            <span className="text-xs text-muted font-mono">Real-time Pipeline</span>
          </div>
          <h4 className="font-display text-lg sm:text-xl font-bold text-text mt-1">
            Automate This: Connect Triggers, Actions & Outcomes
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={runSimulation}
            disabled={isRunning}
            variant="primary"
            size="sm"
            leftIcon={<Play className={`w-3.5 h-3.5 ${isRunning ? "animate-pulse" : ""}`} />}
          >
            {isRunning ? "Simulating Pipeline..." : "Run Test Pipeline"}
          </Button>
          <Button
            onClick={() => setActiveStep(1)}
            variant="outline"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Visual Workflow Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {WORKFLOW_STEPS.map((step) => {
          const Icon = step.icon;
          const isCompleted = step.id < activeStep;
          const isCurrent = step.id === activeStep;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`p-3.5 rounded-xl border text-left transition-all relative ${
                isCurrent
                  ? "bg-surface border-accent shadow-sm ring-1 ring-accent"
                  : isCompleted
                  ? "bg-bg-secondary border-border hover:border-text"
                  : "bg-surface/50 border-border opacity-60 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isCurrent
                      ? "bg-accent text-white"
                      : isCompleted
                      ? "bg-text text-bg"
                      : "bg-bg-secondary text-muted"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className="font-mono text-[10px] text-muted">{step.system}</span>
              </div>
              <div className="font-display font-semibold text-xs text-text truncate">
                {step.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Pipeline Inspector Card */}
      <div className="rounded-xl border border-border bg-surface p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono text-xs text-muted uppercase">
              Pipeline Stage: {currentStepData.label}
            </span>
          </div>
          <h5 className="font-display text-base sm:text-lg font-bold text-text">
            {currentStepData.description}
          </h5>
          <p className="text-xs text-muted leading-relaxed">
            Eliminates human delay and phone tag. Every customer gets an immediate structured response,
            and your operational database remains synchronized without manual data entry.
          </p>
        </div>

        <div className="lg:col-span-5 bg-[#1e1e1e] text-[#e0e0e0] rounded-lg p-4 font-mono text-[11px] leading-relaxed border border-border overflow-x-auto">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-white/40 text-[10px]">
            <span>PAYLOAD STREAM // JSON</span>
            <span>SYSTEM STATUS: OK</span>
          </div>
          <pre className="text-emerald-400">
            {JSON.stringify(currentStepData.payload, null, 2)}
          </pre>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted font-mono">
        <span>Outcome: Zero missed leads outside business hours. Reduced front-desk admin time.</span>
        <Button href="/services" variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
          Explore Automation Services
        </Button>
      </div>
    </div>
  );
}
