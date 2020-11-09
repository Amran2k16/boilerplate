import request from "supertest";
import { app } from "../app";
import { Ticket } from "../models/ticket";
import mongoose from "mongoose";

const createTicket = async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "Asdafsdf", price: 20 });
  return response;
};

describe("Get tickets", () => {
  it("can fetch a list of tickets", async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app)
      .get("/api/tickets")
      .set("Cookie", global.signin())
      .send()
      .expect(200);
    expect(response.body.length).toEqual(3);
  });

  it("returns a 404 if the ticket is not found", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).get(`/api/tickets/${id}`).send().expect(404);
  });

  it("returns the ticket if the ticket is found", async () => {
    const title = "concert";
    const price = 20;

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        title,
        price,
      })
      .expect(201);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send()
      .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
  });
});

describe("Create tickets", () => {
  it("has a route handler listening to /api/tickets for post requests", async () => {
    const response = await request(app).post("/api/tickets").send({});

    expect(response.status).not.toEqual(404);
  });

  it("can only be accessed if the user is signed in", async () => {
    await request(app).post("/api/tickets").send({}).expect(401);
  });

  it("returns a status other than 401 if the user is signed in", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({});

    expect(response.status).not.toEqual(401);
  });

  it("returns an error if an invalid title is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        title: "",
        price: 10,
      })
      .expect(400);

    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        price: 10,
      })
      .expect(400);
  });

  it("returns an error if an invalid price is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        title: "asldkjf",
        price: -10,
      })
      .expect(400);

    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        title: "laskdfj",
      })
      .expect(400);
  });

  it("creates a ticket with valid inputs", async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = "asldkfj";

    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        title,
        price: 20,
      })
      .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
    expect(tickets[0].title).toEqual(title);
  });
});
describe("Update ticket", () => {
  it("should return a 404 if the provided id does not exist", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .set("Cookie", global.signin())
      .send({ title: "fasdf", price: 20 })
      .expect(404);
  });
  it("should return a 401 if the user is not authenticated", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .send({ title: "fasdf", price: 20 })
      .expect(401);
  });
  it("should return a 401 if the user does not own the ticket", async () => {
    const ticket = await request(app)
      .post(`/api/tickets`)
      .set("Cookie", global.signin())
      .send({ title: "fasdf", price: 20 })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${ticket.body.id}`)
      .set("Cookie", global.signin())
      .send({ title: "fasdfasdf", price: 23123 })
      .expect(401);
  });
  it("should return a 400 if the user provides an invalid title or price", async () => {});
  it("should return a 404 if the provided id does not exist", async () => {});
  it("should update the ticket ", async () => {});
});
