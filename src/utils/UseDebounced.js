import { useState, useCallback } from "react";
import { debounce } from "lodash-es";

const useDebounce = (fnToDebounce, durationInMs = 200) => {
	if (isNaN(durationInMs)) {
		throw new TypeError("durationInMs for debounce should be a number");
	}

	if (fnToDebounce == null) {
		throw new TypeError("fnToDebounce cannot be null");
	}

	if (typeof fnToDebounce !== "function") {
		throw new TypeError("fnToDebounce should be a function");
	}

	return useCallback(debounce(fnToDebounce, durationInMs), [fnToDebounce, durationInMs]);
};

const useDebounced = (initialState, durationInMs = 200) => {
	const [internalState, setInternalState] = useState(initialState);
	const debouncedFunction = useDebounce(setInternalState, durationInMs);
	return [internalState, debouncedFunction];
};


export default useDebounced;