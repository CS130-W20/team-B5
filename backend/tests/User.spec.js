const createUser = require('../controllers/createUser')
const login = require('../controllers/login')
const logOut = require('../controllers/logOut')

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (sessionData) => {
  return {
    swagger: { params: sessionData }
  };
};

describe("Operations performed on or by Users", () => {
  test("Program should be able to create a user (req, res)", () => {
    const req = mockRequest({ username: 'test@gmail.com' }, {password: 'password'});
    const res = mockResponse();

    createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("status_code:200");
  });

  test("Program should be able to log a user in (req, res)", () => {
    const req = mockRequest({ username: 'test@gmail.com' }, {password: 'password'});
    const res = mockResponse();
    login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("status_code:200");
  });

  test("Program should be able to create a user (req)", () => {
    const req = mockRequest({ username: 'test@gmail.com' }, {password: 'password'});
    const res = mockResponse();
    logOut(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("status_code:200");
  });


});
