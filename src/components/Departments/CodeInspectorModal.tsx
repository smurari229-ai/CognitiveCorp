import React, { useState } from 'react';
import { 
  X, 
  Code, 
  Copy, 
  Check, 
  FileCode, 
  Terminal, 
  Cpu, 
  CheckCircle2 
} from 'lucide-react';
import { useEnterprise } from '../../context/EnterpriseContext';

interface CodeInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_CODE_FILES = [
  {
    name: 'cluster_autoscaler.rs',
    language: 'Rust',
    author: 'David Sterling (Lead Dev AI)',
    client: 'Apex Cloud Solutions GmbH',
    content: `// Autonomous eBPF Kernel Event Loop & Zero-Downtime Microscaler
// Synthesized by David Sterling AI for Apex Cloud Solutions GmbH

use tokio::sync::mpsc;
use std::time::Duration;

#[derive(Debug, Clone)]
pub struct ClusterNodeMetrics {
    pub node_id: String,
    pub cpu_utilization_pct: f64,
    pub memory_pressure_pct: f64,
    pub active_ingress_qps: u64,
}

pub struct AutonomousAutoscaler {
    threshold_scale_up: f64,
    cooldown_period: Duration,
}

impl AutonomousAutoscaler {
    pub fn new() -> Self {
        Self {
            threshold_scale_up: 78.5,
            cooldown_period: Duration::from_millis(400),
        }
    }

    pub async fn evaluate_and_scale(&self, metrics: &ClusterNodeMetrics) -> Result<bool, &'static str> {
        if metrics.cpu_utilization_pct > self.threshold_scale_up {
            println!("[AUTOSCALE] Scaling out shard node for node {}", metrics.node_id);
            // Non-blocking eBPF hook dispatch
            Ok(true)
        } else {
            Ok(false)
        }
    }
}
`
  },
  {
    name: 'l2_arbitrage_engine.cpp',
    language: 'C++',
    author: 'Marcus Kane (Fintech AI)',
    client: 'Quantum Capital Partners',
    content: `// Sub-Millisecond High-Frequency L2 Order Book Arbitrage Bridge
// Synthesized by Marcus Kane AI for Quantum Capital Partners

#include <iostream>
#include <vector>
#include <chrono>

struct OrderBookLevel {
    double price;
    double volume;
};

class ArbitrageRiskEngine {
private:
    double min_profit_threshold_bps = 4.2;

public:
    inline bool evaluate_cross_exchange_spread(
        const OrderBookLevel& venue_a_bid, 
        const OrderBookLevel& venue_b_ask
    ) noexcept {
        double spread = venue_a_bid.price - venue_b_ask.price;
        if (spread > (venue_b_ask.price * (min_profit_threshold_bps / 10000.0))) {
            // Immediate atomic execution trigger
            return true;
        }
        return false;
    }
};
`
  },
  {
    name: 'protein_graph_matcher.py',
    language: 'Python',
    author: 'David Sterling AI',
    client: 'Zenith BioTech Labs',
    content: `# Deep Neural Affinity Prediction Engine
# Synthesized by David Sterling AI for Zenith BioTech Labs

import torch
import torch.nn as nn

class MolecularGraphInteraction(nn.Module):
    def __init__(self, in_features: int = 128, hidden_dim: int = 256):
        super().__init__()
        self.message_passing = nn.Sequential(
            nn.Linear(in_features, hidden_dim),
            nn.SiLU(),
            nn.Linear(hidden_dim, 64)
        )
        self.affinity_head = nn.Linear(64, 1)

    def forward(self, receptor_graph, ligand_tensor):
        embeddings = self.message_passing(ligand_tensor)
        predicted_ic50 = self.affinity_head(embeddings)
        return torch.sigmoid(predicted_ic50)
`
  }
];

export const CodeInspectorModal: React.FC<CodeInspectorModalProps> = ({ isOpen, onClose }) => {
  const { language } = useEnterprise();
  const isHindi = language === 'hi';

  const [activeFileIdx, setActiveFileIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentFile = SAMPLE_CODE_FILES[activeFileIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span>{isHindi ? 'एआई वर्कर द्वारा संकलित कोड (Generated Source Code)' : 'AI Worker Synthesized Code Inspector'}</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {isHindi ? 'क्लाइंट अनुबंधों के लिए एआई इंजीनियरों द्वारा तैयार वास्तविक कोड' : 'Live inspected deliverables authored by autonomous agents'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isHindi ? 'कॉपी हो गया' : 'Copied!') : (isHindi ? 'कोड कॉपी करें' : 'Copy Code')}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="bg-slate-950/80 px-6 py-2.5 border-b border-slate-800 flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-2">
            {SAMPLE_CODE_FILES.map((file, idx) => (
              <button
                key={file.name}
                onClick={() => setActiveFileIdx(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  activeFileIdx === idx 
                    ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{file.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>0 LINT ERRORS • COMPILED</span>
          </div>
        </div>

        {/* Meta details */}
        <div className="px-6 py-2.5 bg-slate-900 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div>
            <span className="text-slate-400">{isHindi ? 'एआई लेखक:' : 'Author:'}</span>{' '}
            <span className="font-semibold text-white">{currentFile.author}</span>
          </div>
          <div>
            <span className="text-slate-400">{isHindi ? 'क्लाइंट अनुबंध:' : 'Client Contract:'}</span>{' '}
            <span className="font-semibold text-emerald-400">{currentFile.client}</span>
          </div>
          <div>
            <span className="text-slate-400">{isHindi ? 'भाषा:' : 'Language:'}</span>{' '}
            <span className="font-mono text-cyan-400 font-bold uppercase">{currentFile.language}</span>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-6 bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto max-h-96">
          <pre className="leading-relaxed">
            <code>{currentFile.content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
