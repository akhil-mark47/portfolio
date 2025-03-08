import GlassSection from "../GlassSection";

export default function Projects() {
  return (
    <GlassSection id="projects" title="Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            "title": "OneDrop: Blood Donation Ecosystem",
            "desc": "Flutter-based mobile app connecting citizens, hospitals, and blood banks to streamline blood donation and shortage management, featuring real-time inventory tracking and location-based hospital mapping.",
            "tech": ["Flutter", "Firebase (Auth, Firestore)", "Google Maps Flutter", "FL Chart"],
            "github": "https://github.com/akhil-varsh/OneDrop" // Replace with your actual GitHub link
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
            title: "SnapLearn: Smart Question Paper Generator",
            desc: "Flutter-based mobile app that reduces question paper creation time by 75% using AI and OCR.",
            tech: ["Flutter", "Google ML Kit", "Gemini 1.5 Pro"],
            github: "https://github.com/akhil-varsh/SnapLearn",
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