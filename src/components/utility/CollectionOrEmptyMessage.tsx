import React from "react";

interface CollectionOrEmptyMessageProps<T> {
  collection: T[];
  children: React.ReactNode;
  emptyMessage: React.ReactNode;
}

function CollectionOrEmptyMessage<T>({
  collection,
  children,
  emptyMessage,
}: CollectionOrEmptyMessageProps<T>) {
  if (collection.length === 0) {
    return <>{emptyMessage}</>;
  }
  return <>{children}</>;
}

export default CollectionOrEmptyMessage;
