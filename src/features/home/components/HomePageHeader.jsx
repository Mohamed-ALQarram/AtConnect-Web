import { Search } from 'lucide-react';
import { useHomeStore } from '../stores/homeStore';

export const HomePageHeader = () => {
  const { searchQuery, setSearchQuery } = useHomeStore();

  return (
    <div className="flex items-center justify-between py-6">
      <h1 className="text-2xl font-bold text-main">Home</h1>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 bg-surface text-sm text-main placeholder-muted rounded-full py-2 pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Placeholder for User Profile Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-400 p-0.5 cursor-pointer">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=currentUser`}
            alt="Profile"
            className="w-full h-full rounded-full object-cover bg-card"
          />
        </div>
      </div>
    </div>
  );
};
