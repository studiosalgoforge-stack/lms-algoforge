import { MoreVertical } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: "Chakra Soft UI Version",
    icon: "https://i.imgur.com/83ZJ4Vb.png", // Example icon
    budget: "$14,000",
    status: "Working",
    completion: 60,
  },
  {
    id: 2,
    name: "Add Progress Track",
    icon: "https://i.imgur.com/qR4EtcT.png", // Example icon
    budget: "$53,000",
    status: "Canceled",
    completion: 100,
  },
  {
    id: 3,
    name: "Fix Platform Errors",
    icon: "https://i.imgur.com/83ZJ4Vb.png", // Example icon
    budget: "$14,000",
    status: "Done",
    completion: 70,
  },
  {
    id: 4,
    name: "Launch our Mobile App",
    icon: "https://i.imgur.com/e2w3J3G.png", // Example icon
    budget: "$532,000",
    status: "Done",
    completion: 40,
  },
  {
    id: 5,
    name: "Add the New Pricing Page",
    icon: "https://i.imgur.com/K72GSy3.png", // Example icon
    budget: "$14,000",
    status: "Working",
    completion: 90,
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
  if (status === "Working") {
    return <span className={`${baseClasses} bg-blue-500/20 text-blue-400`}>Working</span>;
  }
  if (status === "Done") {
    return <span className={`${baseClasses} bg-green-500/20 text-green-400`}>Done</span>;
  }
  if (status === "Canceled") {
    return <span className={`${baseClasses} bg-red-500/20 text-red-400`}>Canceled</span>;
  }
  return <span className={`${baseClasses} bg-gray-500/20 text-gray-400`}>{status}</span>;
};

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
      <p className="text-gray-400 mb-8">
        <span className="text-green-400 font-bold">✓</span> 30 done this month
      </p>

      <div className="bg-secondary-dark rounded-2xl p-4">
        <table className="w-full">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">LIST</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">BUDGET</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">STATUS</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">COMPLETION</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-primary-dark transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <img src={project.icon} alt="" className="w-8 h-8"/>
                    <span className="font-semibold text-white">{project.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white font-semibold">{project.budget}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={project.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-white">{project.completion}%</span>
                    <div className="w-full bg-primary-dark rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${project.completion}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-gray-400 hover:text-white">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}