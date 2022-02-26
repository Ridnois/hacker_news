import { useEffect } from 'react';

import {
  useTrackVisibility,
  IntersectionObserverHookArgs,
  IntersectionObserverHookRefCallback as UseInfiniteScrollHookRefCallback,
  IntersectionObserverHookRootRefCallback as UseInfiniteScrollHookRootRefCallback,
} from 'react-intersection-observer-hook';

const DEFAULT_DELAY_IN_MS = 100;

export type UseInfiniteScrollHookResult = [
  UseInfiniteScrollHookRefCallback,
  { rootRef: UseInfiniteScrollHookRootRefCallback },
];

export type UseInfiniteScrollHookArgs = Pick<
  IntersectionObserverHookArgs,
  // We pass this to 'IntersectionObserver'. We can use it to configure when to trigger 'onLoadMore'.
  'rootMargin'
> & {
  // Some sort of "is fetching" info of the request.
  loading: boolean;
  // If the list has more items to load.
  hasNextPage: boolean;
  // The callback function to execute when the 'onLoadMore' is triggered.
  // eslint-disable-next-line no-undef
  onLoadMore: VoidFunction;
  // Flag to stop infinite scrolling. Can be used in case of an error etc too.
  disabled?: boolean;
  // How long it should wait before triggering 'onLoadMore'.
  delayInMs?: number;
};

export const useInfiniteScroll = ({
  loading,
  hasNextPage,
  onLoadMore,
  rootMargin,
  disabled,
  delayInMs = DEFAULT_DELAY_IN_MS,
}: UseInfiniteScrollHookArgs) => {
  const [ref, {rootRef, isVisible}] = useTrackVisibility({rootMargin});
  const shouldLoadMore = !disabled && !loading && isVisible && hasNextPage;

  useEffect(() => {
    if(shouldLoadMore) {
      const timer = setTimeout(() => {
        onLoadMore();
      }, delayInMs);

      return () => {
        clearTimeout(timer)
      }
    }
  }, [onLoadMore, shouldLoadMore, delayInMs])

  return [ref, { rootRef }]
}


