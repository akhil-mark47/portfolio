import GlassSection from "../GlassSection";

export default function Projects() {
  return (
    <GlassSection id="projects" title="Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "SnapLearn: Smart Question Paper Generator",
            desc: "Flutter-based mobile app that reduces question paper creation time by 75% using AI and OCR.",
            tech: ["Flutter", "Google ML Kit", "Gemini 1.5 Pro"],
            github: "https://github.com/akhil-varsh/SnapLearn",
          },
          {
            title: "Urban Hero: Waste Reporting Platform",
            desc: "Flutter app for waste reporting, increasing municipal response efficiency by 70% through real-time tracking.",
            tech: ["Flutter", "Firebase"],
            github: "https://github.com/akhil-varsh/UrbanHero",
          },
          {
            title: "Syntax Sage: Code Analysis Platform",
            desc: "Flask-based platform for automated code analysis using Llama 3.1:8B and CrewAI, improving efficiency by 60%.",
            tech: ["Flask", "Llama 3.1:8B", "CrewAI", "Ollama"],
            github: "https://github.com/akhil-varsh/SyntaxSage",
          },
          {
            title: "CNN-Multi Class Classifier",
            desc: "Built a CNN Classifier using PyTorch, achieving 90% accuracy on test data with efficient batch processing.",
            tech: ["PyTorch", "Python", "Jupyter"],
            github: "https://github.com/akhil-varsh/CNN-Multi-Class-Classifier",
          },
          {
            title: "RAG-Powered Chatbot for Intelligent Course Assistance",
            desc: "Developed a LangChain-powered chatbot using OCI Generative AI with Cohere embeddings for context-aware responses.",
            tech: ["LangChain", "OCI", "Cohere Command Model", "Streamlit", "ChromaDB"],
            github: "https://github.com/akhil-varsh/RAG-Powered-Chatbot-for-Intelligent-Course-Assistance",
          },
          {
            title: "Web Scraping Tool for Amazon Products",
            desc: "Built a web scraping tool using Beautiful Soup to extract the top 10 product links from Amazon based on user input.",
            tech: ["Beautiful Soup", "Python"],
            github: "N/A",
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