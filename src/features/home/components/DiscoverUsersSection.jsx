import { useUsersQuery } from '../hooks/useUsersQuery';
import { DiscoverUserCard } from './DiscoverUserCard';
import { useHomeStore } from '../stores/homeStore';
import { useMemo } from 'react';

export const DiscoverUsersSection = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useUsersQuery(10);
  const searchQuery = useHomeStore((state) => state.searchQuery);

  const users = useMemo(() => {
    if (!data) return [];
    // Flatten the array of pages into a single array of items
    const allUsers = data.pages.flatMap((page) => page.data?.items || []);

    // Simple frontend filtering if standard search is applied
    if (searchQuery.trim() === '') return allUsers;

    const lowerQuery = searchQuery.toLowerCase();
    return allUsers.filter(user =>
      user.fullName.toLowerCase().includes(lowerQuery) ||
      user.userName.toLowerCase().includes(lowerQuery)
    );
  }, [data, searchQuery]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 w-48 bg-surface rounded mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(n => <div key={n} className="h-72 bg-card rounded-2xl"></div>)}
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-danger mt-10 text-center">Failed to load discoverable users.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-main mb-6">Discover Users</h2>

      {users.length === 0 ? (
        <div className="text-muted text-center py-10">No users found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {users.map((user) => (
            <DiscoverUserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      {hasNextPage && (
        <div className="flex justify-center mt-12 mb-8">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="flex items-center gap-2 bg-surface hover:bg-opacity-80 text-main px-6 py-2.5 rounded-full font-semibold transition-colors disabled:opacity-50"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More v'}
          </button>
        </div>
      )}
    </div>
  );
};
