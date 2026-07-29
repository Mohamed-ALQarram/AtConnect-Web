import React, { useMemo } from 'react';
import { useGuestUsersQuery } from '../hooks/useGuestUsersQuery';
import { GuestUserCard } from './GuestUserCard';
import { useGuestStore } from '../stores/useGuestStore';
import { Users } from 'lucide-react';

export const GuestUsersSection = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useGuestUsersQuery(10);
  const searchQuery = useGuestStore((state) => state.searchQuery);

  const users = useMemo(() => {
    if (!data) return [];
    const allUsers = data.pages.flatMap((page) => page.data?.items || []);

    if (searchQuery.trim() === '') return allUsers;

    const lowerQuery = searchQuery.toLowerCase();
    return allUsers.filter(user =>
      user.fullName.toLowerCase().includes(lowerQuery) ||
      (user.userName && user.userName.toLowerCase().includes(lowerQuery))
    );
  }, [data, searchQuery]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 w-48 bg-surface rounded mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map(n => <div key={n} className="h-72 bg-card rounded-2xl"></div>)}
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-danger mt-10 text-center">Failed to load discoverable users. Please try again later.</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users size={20} className="text-primary" />
          <h2 className="text-xl font-bold text-main">Community Members</h2>
        </div>
        <span className="text-xs text-muted font-medium">
          Showing {users.length} member{users.length !== 1 ? 's' : ''}
        </span>
      </div>

      {users.length === 0 ? (
        <div className="text-muted text-center py-16 bg-card/50 rounded-2xl border border-dark">
          <p className="text-base font-semibold text-main mb-1">No users found matching your search</p>
          <p className="text-xs text-muted">Try typing a different name or clear the search filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {users.map((user) => (
            <GuestUserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      {hasNextPage && (
        <div className="flex justify-center mt-12 mb-8">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="flex items-center gap-2 bg-surface hover:bg-opacity-80 text-main border border-dark px-6 py-2.5 rounded-full font-semibold transition-colors disabled:opacity-50 text-sm shadow-sm"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More Members'}
          </button>
        </div>
      )}
    </div>
  );
};
