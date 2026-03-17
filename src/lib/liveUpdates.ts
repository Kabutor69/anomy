export type LivePostPayload = {
  _id: string;
  message: string;
  createdAt: string;
};

type PostListener = (payload: LivePostPayload) => void;

declare global {
  var __anomyPostListeners: Set<PostListener> | undefined;
}

const listeners = global.__anomyPostListeners ?? new Set<PostListener>();

if (!global.__anomyPostListeners) {
  global.__anomyPostListeners = listeners;
}

export const subscribeToPostEvents = (listener: PostListener) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const publishPostEvent = (payload: LivePostPayload) => {
  for (const listener of listeners) {
    listener(payload);
  }
};
