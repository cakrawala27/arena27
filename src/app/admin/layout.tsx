import Link from 'next/link';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen bg-gray-100">
			<aside className="fixed flex h-full w-64 flex-col bg-slate-900 p-6 text-white">
				<Link href="/admin" className="mb-8">
					<h1 className="text-2xl font-bold text-orange-500">🏟️ Arena27</h1>
					<p className="mt-1 text-xs text-slate-400">Admin Dashboard</p>
				</Link>

				<nav className="flex flex-1 flex-col space-y-2">
					<Link href="/admin" className="flex items-center space-x-3 rounded-lg p-3 transition hover:bg-slate-800">
						<span>📊</span> <span>Dashboard</span>
					</Link>
					<Link href="/admin/articles" className="flex items-center space-x-3 rounded-lg p-3 transition hover:bg-slate-800">
						<span>📝</span> <span>Articles</span>
					</Link>
					<Link href="/admin/articles/new" className="flex items-center space-x-3 rounded-lg p-3 transition hover:bg-slate-800">
						<span>➕</span> <span>Add New Article</span>
					</Link>
					<Link href="/admin/categories" className="flex items-center space-x-3 rounded-lg p-3 transition hover:bg-slate-800">
						<span>📁</span> <span>Categories</span>
					</Link>
					<Link href="/admin/tags" className="flex items-center space-x-3 rounded-lg p-3 transition hover:bg-slate-800">
						<span>🏷️</span> <span>Tags</span>
					</Link>
				</nav>

				<div className="mt-auto border-t border-slate-700 pt-6">
					<div className="mb-4 flex items-center space-x-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-lg font-bold">
							A
						</div>
						<div>
							<p className="text-sm font-medium">Admin</p>
							<p className="text-xs text-slate-400">Super Admin Arena27</p>
						</div>
					</div>
					<button className="w-full rounded-lg bg-red-600 p-3 text-sm transition hover:bg-red-700">
						🚪 Logout
					</button>
				</div>
			</aside>

			<main className="ml-64 flex-1 overflow-y-auto p-8">{children}</main>
		</div>
	);
}
