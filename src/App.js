import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Individual from "./Individual";
import Spinner from "./Spinner.svg"

function App() {
  const [employees, setEmployees] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://api.matgargano.com/employees/").then((response) => {
      setEmployees(response.data);
      setLoading(false);    
    });
  }, []);

  if (loading) {
    return (
      <div>
      <img src={Spinner} alt="spinning loading icon" className="loadingImg"/>
      </div>
    );
  }

  return (
    <div>
      {selectedEmployee ? (
        <Individual employee={selectedEmployee} />
      ) : (
        <div>
          <div>
            {employees.map((employee) => (
              <div className="container">
                <div
                  className="card"
                  key={employee.id}
                  onClick={() => {
                    setSelectedEmployee(employee);
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">ID: {employee.id}</h5>
                    <h5 className="card-title">Name: {employee.name}</h5>
                    <h5 className="card-title">
                      Department: {employee.department}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
