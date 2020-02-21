# Black box restful API testing of backend server

## Overview
This testing was done by the [Tavern](https://taverntesting.github.io/) project.  

## Running the test 
To run the test, run:\
pip install tavern\
pip install tavern[pytest]\
py.test test_minimal.tavern.yaml  -v


## test cases
<pre>
/user username_create successfully created user
expected response:
    status_code:200

/user username_create bad input parameter
expected response:  
    status_code:400

/user username_create conflict username
expected response: 
    status_code:409

/user username_create conflict username
expected response: 
    status_code:409

/user login successfully login
expected response:
    status_code:200
    JSON:{ user_token: test_login_token} 

/user login bad input parameter
expected response: 
    status_code:400

/user login bad credential
expected response:
    status_code:401

/data upload new data successfully
expected response:
    status_code:200 
    JSON:{ data_id: test_data_id}

/data upload new data successfully
expected response: 
    status_code:200
    JSON:{ data_id: test_data_id}

/data upload new data bad input parameter
expected response: 
    status_code:400

/data upload new data bad token
expected response: 
    status_code:401

/user log out successfully
expected response:
    status_code:200

/user log out bad input parameter
expected response:
    status_code:400

/user log out bad token
expected response:
    status_code:401
</pre>