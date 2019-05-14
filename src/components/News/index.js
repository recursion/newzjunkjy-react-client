import React, { useEffect, useState } from "react";
import useRequest from "../Request";
import { FETCHING, SUCCESS } from "../Request/constants";
import { apiServer } from "../../config";
// const add = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;
const add = `${apiServer}stories`;

const News = () => {
  const [requestState, makeRequest] = useRequest(add);
  const [stories, setStories] = useState(null);

  useEffect(() => {
    if (requestState.status === null) {
      makeRequest();
    }
  });

  return (
    <div className="container p-5 m-auto">
      {requestState.status === SUCCESS && requestState.body ? (
        requestState.body.status === "error" ? (
          <div>{requestState.body.message}</div>
        ) : (
          !stories && setStories(requestState.body.data)
        )
      ) : (
        <div />
      )}

      {requestState.status === FETCHING && (
        <div className="m-auto w-full">Fetching News...</div>
      )}

      {stories && (
        <div>
          {stories.map(s => (
            <div
              className="my-3 p-2 border border-black rounded"
              key={`:-:${s.title}`}
            >
              {s.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
