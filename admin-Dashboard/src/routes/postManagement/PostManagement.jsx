import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:6060/api/admin/post";
const POSTS_PER_PAGE = 5;

export default function PostManagement() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem("adminToken");

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_BASE}/status?status=${status}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
      setFilteredPosts(res.data);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (postId, action) => {
    const confirmMsg = action === "approve" ? "Approve this post?" : "Reject this post?";
    if (!window.confirm(confirmMsg)) return;

    try {
      await axios.patch(`${API_BASE}/${action}/${postId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (err) {
      console.error(`Error trying to ${action} post:`, err);
      setError(`Failed to ${action} the post.`);
    }
  };

  useEffect(() => {
    const text = filterText.toLowerCase();
    const filtered = posts.filter((post) =>
      post.title?.toLowerCase().includes(text) ||
      post.userId?.email?.toLowerCase().includes(text) ||
      post.company?.toLowerCase().includes(text)
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [filterText, posts]);

  useEffect(() => {
    fetchPosts();
  }, [status]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Posts</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        {["pending", "approved", "rejected"].map((s) => (
          <button
            key={s}
            onClick={() => {
              setStatus(s);
              setFilterText("");
            }}
            className={`px-4 py-2 rounded font-semibold ${
              status === s ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}

        <input
          type="text"
          placeholder="Filter by title, email, or company..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="flex-1 px-4 py-2 border rounded w-full sm:w-64"
        />

        <button
          onClick={fetchPosts}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {!loading && paginatedPosts.length === 0 && <p>No posts match your filters.</p>}

      {/* Posts */}
      <div className="space-y-6">
        {paginatedPosts.map((post) => (
          <div
            key={post._id}
            className="border p-4 rounded shadow-sm bg-white"
          >
            <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
            <p className="text-gray-700 mb-2">{post.description}</p>
            <p className="text-sm text-gray-500 mb-1">Company: {post.company || "N/A"}</p>
            <p className="text-sm text-gray-500 mb-2">By: {post.userId?.email || "Unknown"}</p>

            {post.visualContent && post.visualContentType === "image" && (
              <img
                src={post.visualContent}
                alt="Post visual"
                className="mb-3 max-h-48 w-full object-contain rounded"
              />
            )}
            {post.visualContent && post.visualContentType === "video" && (
              <video controls src={post.visualContent} className="mb-3 max-h-48 w-full rounded" />
            )}

            {status === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleAction(post._id, "approve")}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(post._id, "reject")}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}









// import { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE = "http://localhost:6060/api/admin/post"; 

// export default function PostManagement() {
//   const [posts, setPosts] = useState([]);
//   const [status, setStatus] = useState("pending"); // can be 'pending', 'approved', 'rejected'
//   const token = localStorage.getItem("adminToken");

  
//   const fetchPosts = async () => {
//     console.log("🔐 Token being sent:", token);
//     try {
//       const res = await axios.get(`${API_BASE}/status?status=${status}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPosts(res.data);
//     } catch (err) {
//       console.error("Error fetching posts:", err);
//     }
//   };

//   const handleAction = async (postId, action) => {
//     try {
//       await axios.patch(`${API_BASE}/${action}/${postId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchPosts(); // Refresh
//     } catch (err) {
//       console.error(`Error trying to ${action} post:`, err);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [status]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Manage Posts</h1>

//       {/* Status Filter */}
//       <div className="mb-4">
//         {["pending", "approved", "rejected"].map((s) => (
//           <button
//             key={s}
//             onClick={() => setStatus(s)}
//             className={`px-4 py-2 mr-2 rounded ${
//               status === s ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             {s.charAt(0).toUpperCase() + s.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Posts Table */}
//       <div className="space-y-4">
//         {posts.length === 0 ? (
//           <p>No posts found.</p>
//         ) : (
//           posts.map((post) => (
//             <div key={post._id} className="border p-4 rounded shadow-sm">
//               <h3 className="text-lg font-semibold">{post.title}</h3>
//               <p>{post.description}</p>
//               <p className="text-sm text-gray-500">By: {post.userId?.email}</p>
//               <div className="mt-2">
//                 {status === "pending" && (
//                   <>
//                     <button
//                       onClick={() => handleAction(post._id, "approve")}
//                       className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleAction(post._id, "reject")}
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                     >
//                       Reject
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
