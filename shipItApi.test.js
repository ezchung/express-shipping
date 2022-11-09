"use strict";

const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);

const { shipProduct, SHIPIT_SHIP_URL, SHIPIT_API_KEY } = require("./shipItApi");


// test("shipProduct", async function () {
//   const shipId = await shipProduct({
//     productId: 1000,
//     name: "Test Tester",
//     addr: "100 Test St",
//     zip: "12345-6789",
//   });

//   expect(shipId).toEqual(expect.any(Number));
// });

test("shipProduct", async function () {
  //when someone tries to fake post to this URL, this is the reply we will receive
  axiosMock.onPost(SHIPIT_SHIP_URL
  ).reply(200, {
    receipt: {
      itemId: 1000,
      name: 'Test Tester',
      addr: '100 Test St',
      zip: '12345-6789',
      shipId: 8608
    }
  });

  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipId).toEqual(8608);
});