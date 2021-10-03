import React, { useEffect, useState } from "react";
import Job from "../../../layouts/components/Job";
import DefaultStructure from "../../../layouts/defaultStructure";
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";

import "./Jobsearch.css";
import { JOBS_QUERY } from "../../../graphql/queries/jobQuery";
import JobFilter from "../../../layouts/components/JobFilter";

function JobMaster() {
  const [whatSearch, setWhatSearch] = useState("");
  const [whereSearch, setWhereSearch] = useState("");
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [showDateOptions, setShowDateOptions] = useState(false);
  const [showSalaryOptions, setShowSalaryOptions] = useState(false);
  const [showRemoteOptions, setShowRemoteOptions] = useState(false);
  const [showJobTypeOptions, setShowJobTypeOptions] = useState(false);
  const [showEducationOptions, setShowEducationOptions] = useState(false);
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [showCompanyOptions, setShowCompanyOptions] = useState(false);

  const { loading, error, data } = useQuery(JOBS_QUERY);
  // const showMenu = (event) => {
  //   console.log(event);
  //   var currElement = event.currentTarget.getBoundingClientRect();
  //   var menuTop = currElement.height + currElement.top;
  //   var menu = document.querySelector("#undermenu");
  //   menu.style.display = "flex";
  //   menu.style.top = menuTop + "px";
  //   menu.style.left = currElement.left + "px";
  // };
  // const hideMenu = (event) => {
  //   console.log(event);
  //   var currElement = event.currentTarget.getBoundingClientRect();
  //   var menuTop = currElement.height + currElement.top;
  //   var menu = document.querySelector("#undermenu");
  //   menu.style.display = "none";
  //   menu.style.top = menuTop + "px";
  //   menu.style.left = currElement.left + "px";
  // };

  const handleWhatSearchInput = (e) => {
    setWhatSearch(e.target.value);
  };

  const handleWhereSearchInput = (e) => {
    setWhereSearch(e.target.value);
  };

  if (error) return <p>Error :(</p>;

  console.log(searchTerm1, whereSearch);

  return (
    <DefaultStructure pageTitle="Job Search">
      <div className="menu" id="undermenu d-none">
        {/* <div className="content">
          <ul>
            <li onClick={hideMenu}>First content</li>
            <li onClick={hideMenu}>Second content</li>
            <li onClick={hideMenu}>Third content</li>
            <li onClick={hideMenu}>Fourth content</li>
          </ul>
        </div> */}
      </div>
      <div className="searchHeader">
        <div className="search">
          <div className="searchWhat">
            <div className="textWrapper">
              <label
                id="label-text-input-what"
                className="icl-TextInput-label"
                for="text-input-what"
                tabindex="-1"
              >
                What
              </label>
            </div>
            <div className="searchinput">
              <input
                type="text"
                aria-labelledby="label-text-input-what"
                id="text-input-what"
                name="q"
                placeholder="job title, keywords, or company"
                autocomplete="off"
                aria-owns="text-input-what-suggestion-list"
                className="searcfield"
                aria-invalid="false"
                value={whatSearch}
                onChange={handleWhatSearchInput}
              />
              <span className="ico">
                <i className="fa fa-search" aria-hidden="true"></i>
              </span>
            </div>
          </div>
          <div className="searchWhere">
            <div className="textWrapper">
              <label
                id="label-text-input-what"
                className="icl-TextInput-label"
                for="text-input-what"
                tabindex="-1"
              >
                Where
              </label>
            </div>
            <div className="searchinput">
              <input
                type="text"
                aria-labelledby="label-text-input-what"
                id="text-input-what"
                name="q"
                placeholder="city or state"
                autocomplete="off"
                aria-owns="text-input-what-suggestion-list"
                className="searcfield"
                aria-invalid="false"
                value={whereSearch}
                onChange={handleWhereSearchInput}
              />
              <span className="ico">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
              </span>
            </div>
          </div>
          <div className="searchbtn">
            <button
              onClick={() => {
                console.log(whereSearch);
                setSearchTerm1(whatSearch);
                setSearchTerm2(whereSearch);
              }}
              type="button"
              className="btn"
            >
              Find Jobs
            </button>
          </div>
        </div>
        <div className="filters">
          <JobFilter
            text="Date Posted"
            options={[
              "last 24 hours",
              "last 3 days",
              "last 7 days",
              "last 14 days",
            ]}
            show={showDateOptions}
            setShow={setShowDateOptions}
          />
          <JobFilter
            text="Remote"
            options={["Remote", "Non Remote"]}
            show={showRemoteOptions}
            setShow={setShowRemoteOptions}
          />
          <JobFilter
            text="Salary Estimate"
            options={["40,000", "60,000", "80,000", "100,000"]}
            show={showSalaryOptions}
            setShow={setShowSalaryOptions}
          />
          <JobFilter
            text="Job Type"
            options={["Remote", "Full time", "Permanent"]}
            show={showJobTypeOptions}
            setShow={setShowJobTypeOptions}
          />
          <JobFilter
            text="Education Level"
            options={["Degree ", "High school", "self trained"]}
            show={showEducationOptions}
            setShow={setShowEducationOptions}
          />
          <JobFilter
            text="Location"
            options={["London", "Berlin", "New York", "New Delhi"]}
            show={showLocationOptions}
            setShow={setShowLocationOptions}
          />
          <JobFilter
            text="Company"
            options={["Google", "Amazon", "Facebook", "Ali Express"]}
            show={showCompanyOptions}
            setShow={setShowCompanyOptions}
          />
        </div>
        <div className="container mt-5">
          <div
            style={{ gap: 20 }}
            className="d-flex flex-row justify-content-center flex-wrap"
          >
            {searchTerm1.length > 0 && searchTerm2.length < 1
              ? data?.jobs
                  .filter((job) => {
                    let searchRegex = new RegExp(
                      `${searchTerm1.length > 0 ? searchTerm1 : null}`,
                      `i`
                    );
                    return searchRegex.test(job.title);
                  })
                  .map((job) => {
                    return (
                      <Job
                        location={job.cities[0]?.name}
                        title={job.title}
                        description={job.description}
                        companyName={job.company.name}
                        address={job.company.websiteUrl}
                      />
                    );
                  })
              : searchTerm2.length > 0 && searchTerm1.length < 1
              ? data?.jobs
                  .filter((job) => {
                    let searchRegex = new RegExp(
                      `${setSearchTerm2.length > 0 ? searchTerm2 : null}`,
                      `i`
                    );
                    return searchRegex.test(job?.cities[0]?.name);
                  })
                  .filter((job) => {
                    let searchRegex2 = new RegExp(
                      `${searchTerm2.length > 0 ? searchTerm2 : null}`,
                      `i`
                    );
                    return searchRegex2.test(job?.cities[0]?.name);
                  })
                  .map((job) => {
                    return (
                      <Job
                        location={job.cities[0]?.name}
                        title={job.title}
                        description={job.description}
                        companyName={job.company.name}
                        address={job.company.websiteUrl}
                      />
                    );
                  })
              : data?.jobs
                  .filter((job) => {
                    let searchRegex = new RegExp(
                      `${searchTerm1.length > 0 ? searchTerm1 : null}`,
                      `i`
                    );
                    return searchRegex.test(job.title);
                  })
                  .filter((job) => {
                    let searchRegex2 = new RegExp(
                      `${searchTerm2.length > 0 ? searchTerm2 : null}`,
                      `i`
                    );
                    return searchRegex2.test(job?.cities[0]?.name);
                  })
                  .map((job) => {
                    return (
                      <Job
                        location={job.cities[0]?.name}
                        title={job.title}
                        description={job.description}
                        companyName={job.company.name}
                        address={job.company.websiteUrl}
                      />
                    );
                  })}
          </div>
        </div>
      </div>
    </DefaultStructure>
  );
}

export default JobMaster;
