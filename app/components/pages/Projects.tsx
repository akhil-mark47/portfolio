import GlassSection from "../GlassSection";

export default function Projects() {
  return (
    <GlassSection id="projects" title="Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "Multi-Agentic Competition Evaluation Engine",
            desc: "Distributed worker-pull engine on a 20-node HPC GPU cluster serving 50+ concurrent teams at <60s latency with a local Qwen model pipeline.",
            tech: ["Python", "CUDA", "Crontab", "Firebase"],
            github: "https://github.com/akhil-varsh/Multi-Agentic-Competition-Evaluation-Engine",
          },
          {
            title: "HPC GPU Cluster Management System",
            desc: "Slurm-based workload manager for a college GPU lab with GRES allocation, shared NFS, and Grafana resource-accounting dashboards.",
            tech: ["Slurm", "Grafana", "Python", "Linux"],
            github: "https://github.com/akhil-varsh/hpc-gpu-pipeline",
          },
          {
            title: "AI-Powered Incident Management System",
            desc: "Flask microservice cutting incident resolution 50% via RAG + ChromaDB, with Celery async lowering token costs ~70% at sub-200ms responses.",
            tech: ["RAG", "Celery", "PostgreSQL", "ChromaDB"],
            github: "https://github.com/akhil-varsh/Incident-Automation-Agent",
          },
          {
            title: "RAG-Based Financial Document Analysis",
            desc: "LangChain + FAISS system analyzing 100+ page reports with <100ms search and <2s Groq-powered answers, hallucination-free.",
            tech: ["RAG", "LangChain", "FAISS", "Groq"],
            github: "https://github.com/akhil-varsh/RAG-Based-Financial-Document-Analysis-System",
          },
          {
            title: "Multi-Modal Sentiment Analysis System",
            desc: "Attention-based fusion of text, audio and vision (RoBERTa, ViT, Wav2Vec2) reaching 81% accuracy across 50K+ samples, served via Streamlit.",
            tech: ["Deep Learning", "Transformers", "Computer Vision", "Streamlit"],
            github: "https://github.com/akhil-varsh/Multi-Modal-Sentiment-Analysis",
          },
        ].map((project) => (
          <div key={project.title} className="gradient-border p-4 flex flex-col">
            <h3 className="text-xl font-bold text-gradient">{project.title}</h3>
            <p className="font-[JetBrains Mono] text-gray-300">{project.desc}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tech.map((tech) => (
                <span key={tech} className="text-xs font-[JetBrains Mono] px-2 py-1 bg-[rgba(45,0,247,0.2)] rounded">
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-button mt-4 self-start"
            >
              {project.github === "N/A" ? "Private Repo" : "View Project"}
            </a>
          </div>
        ))}
      </div>
    </GlassSection>
  );
}