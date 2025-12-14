import React from "react";
import { useNavigate } from "react-router";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import DeleteIssueBtn from "./DeleteIssueBtn";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  resolved: "bg-green-100 text-green-800",
  in_progress: "bg-blue-100 text-blue-800",
};

const IssueCard = ({ issue }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group rounded-xl p-5 bg-slate-50 border border-slate-200 shadow-sm hover:bg-teal-50 hover:border-teal-300 hover:shadow-lg transition-all"
    >
      <h3 className="text-xl font-semibold text-slate-800 group-hover:text-teal-700">
        {issue.title}
      </h3>

      <p className="text-sm mt-1 text-slate-500 group-hover:text-teal-600">
        {issue.category}
      </p>

      <div className="mt-3">
        <span
          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${statusColors[issue.status]}`}
        >
          {issue.status.replace("_", " ").toUpperCase()}
        </span>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          onClick={() => navigate(`/issues/${issue._id}`)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium bg-slate-200 text-slate-700 hover:bg-teal-600 hover:text-white transition"
        >
          <Eye size={16} /> View
        </button>

        {issue.status === "pending" && (
          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("open-edit-issue", { detail: issue })
              )
            }
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <Pencil size={16} /> Edit
          </button>
        )}

        <DeleteIssueBtn id={issue._id} email={issue.email}>
          <Trash2 size={16} />
        </DeleteIssueBtn>
      </div>
    </motion.div>
  );
};

export default IssueCard;
