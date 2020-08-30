import React, { useState, useEffect, Fragment } from "react";

import { useSource, useProductGuide } from "services/store";
import TableList from "components/TableList";

const SourceItem = ({ source, sourceType, index }) => {
  const [state, setState] = useState({
    isOpen: true,
  });
  const setPGPosition = useProductGuide((state) => state.setPGPosition);
  if (source.properties["is_system_db"]) {
    return null;
  }
  const handleClickSource = () => {
    setState((state) => ({
      ...state,
      isOpen: !state.isOpen,
    }));
  };

  return (
    <Fragment>
      <div
        className="block p-2 pl-3 border-b cursor-default"
        onClick={handleClickSource}
        ref={(el) => {
          index === 0 &&
            el &&
            setPGPosition("source", el.getBoundingClientRect());
        }}
      >
        {sourceType === "database" ? (
          <span className="text-lg text-gray-600 text-center mr-3">
            <i className="fas fa-database" />
          </span>
        ) : null}
        <strong>{source.label}</strong>&nbsp;
        <span className="inline-block bg-green-200 text-sm px-2 rounded">
          {source.provider}
        </span>
      </div>

      {state.isOpen ? (
        <TableList sourceLabel={source.label} sourceType={sourceType} />
      ) : null}
    </Fragment>
  );
};

export default () => {
  const isReady = useSource((state) => state.isReady);
  const sourceRows = useSource((state) => state.rows);
  const fetchSource = useSource((state) => state.fetchSource);
  useEffect(() => {
    fetchSource();
  }, []);
  /* const [state, setState] = useState({
    sourceIndex: null,
  }); */
  // const {sourceIndex} = state;

  if (!isReady) {
    return null;
  }

  return (
    <Fragment>
      <div className="block p-2 pl-3 border-b">
        <span className="text-lg text-yellow-500 text-center mr-3">
          <i className="fas fa-star" />
        </span>
        <strong>Starred</strong>
      </div>
      <div className="block p-2 pl-3 border-b">
        <span className="text-lg text-orange-600 text-center mr-3">
          <i className="fas fa-folder" />
        </span>
        <strong>Orders</strong>
      </div>
      <div className="block p-2 pl-3 border-b">
        <span className="text-lg text-gray-600 text-center mr-3">
          <i className="fas fa-folder" />
        </span>
        <strong>Customers</strong>
      </div>
      <div className="block p-2 pl-3 border-b">
        <span className="text-lg text-gray-600 text-center mr-3">
          <i className="fas fa-folder" />
        </span>
        <strong>Staging</strong>
      </div>
      <div className="block p-2 pl-3 border-b">
        <span className="text-lg text-blue-700 text-center mr-3">
          <i className="fas fa-folder" />
        </span>
        <strong>Shipment</strong>
      </div>
      <div className="block p-2 pl-3 border-b">
        <span className="text-lg text-gray-600 text-center mr-3">
          <i className="fas fa-folder" />
        </span>
        <strong>Content/Marketing</strong>
      </div>
      <div className="block p-2 pl-3 border-b">
        <span className="text-lg text-gray-600 text-center mr-3">
          <i className="fas fa-folder" />
        </span>
        <strong>All Reports</strong>
      </div>

      {sourceRows
        .filter((x) => x.type === "database")
        .map((source, i) => (
          <SourceItem
            key={`sr-${source.label}`}
            index={i}
            source={source}
            sourceType="database"
          />
        ))}

      {/* <Panel title="Services">
        {sourceList.isReady ? sourceList.rows.filter(x => x.type === "service").map((s, i) => (
          <SourceItem s={s} i={count_database + i} sourceType="service" key={`sr-${count_database + i}`} />
        )) : null}
      </Panel> */}
    </Fragment>
  );
};
