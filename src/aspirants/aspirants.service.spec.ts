import "reflect-metadata";
import { AspirantsService } from "./aspirants.service";

/**
 * Contact-privacy behaviour of AspirantsService.findOne().
 *
 * An aspirant controls who can see their contact details via the allow* flags:
 *   - phone is exposed only when allowPhone is true
 *   - whatsappNumber is exposed only when allowWhatsapp is true
 * EXCEPT the owner (the aspirant viewing their own profile), who always sees
 * their own details regardless of the flags — the FE profile screen relies on
 * this via GET /aspirants/:id.
 *
 * These are pure unit tests: the service is constructed with mock dependencies
 * and the internal aggregation helpers are stubbed, so no DB or server is used.
 */
describe("AspirantsService — contact privacy (findOne)", () => {
  const OWNER_USER_ID = 56;
  const ASPIRANT_ID = 54;

  let service: AspirantsService;
  let aspirant: any;

  beforeEach(() => {
    aspirant = {
      id: ASPIRANT_ID,
      userId: OWNER_USER_ID,
      name: "Acchu M",
      gender: "Male", // set so the gender-fallback lookup is skipped
      electionId: null, // skip election/constituency name resolution
      constituencyId: null,
      phone: "9876543210",
      whatsappNumber: "9876543210",
      allowPhone: false,
      allowWhatsapp: true,
      allowChat: true,
      meetings: [],
      user: { isBlocked: false },
      getDocumentStatus: () => ({}),
    };

    const repo = { findOne: jest.fn(async () => aspirant) };
    const visitRepo = { find: jest.fn(async () => []) };
    const noop: any = {};

    service = new AspirantsService(
      repo as any, // aspirant repo
      noop, // meetingRepo
      noop, // bookingRepo
      visitRepo as any, // visitRepo
      noop, // visitResponseRepo
      noop, // meetingResponseRepo
      noop, // activityRatingRepo
      noop, // usersService
      noop, // wardsService
      noop, // electionsService
      noop, // notificationsService
      noop, // votesService
    );

    // Stub the internal aggregations findOne fans out to.
    jest
      .spyOn(service as any, "getActivityRatingsBulk")
      .mockResolvedValue({ meetingRatings: {}, visitRatings: {}, overallRatings: {} });
    jest
      .spyOn(service as any, "getMeetingResponseCounts")
      .mockResolvedValue(new Map());
    jest
      .spyOn(service as any, "getVisitResponseCounts")
      .mockResolvedValue(new Map());
  });

  it("hides phone from an anonymous viewer when allowPhone is false", async () => {
    const res: any = await service.findOne(ASPIRANT_ID);

    expect(res).toBeTruthy();
    expect("phone" in res).toBe(false);
    expect(res.phone).toBeUndefined();
    // whatsapp stays because allowWhatsapp is still true
    expect(res.whatsappNumber).toBe("9876543210");
    // the flag itself is preserved so the client knows the call button is off
    expect(res.allowPhone).toBe(false);
  });

  it("shows phone to the OWNER even when allowPhone is false", async () => {
    const res: any = await service.findOne(ASPIRANT_ID, {
      id: OWNER_USER_ID,
      role: "aspirant",
    });

    expect(res.phone).toBe("9876543210");
    expect(res.whatsappNumber).toBe("9876543210");
  });

  it("hides phone from a different logged-in user when allowPhone is false", async () => {
    const res: any = await service.findOne(ASPIRANT_ID, {
      id: 999,
      role: "voter",
    });

    expect(res.phone).toBeUndefined();
  });

  it("hides whatsappNumber from non-owners when allowWhatsapp is false", async () => {
    aspirant.allowWhatsapp = false;

    const res: any = await service.findOne(ASPIRANT_ID, { id: 999, role: "voter" });

    expect(res.whatsappNumber).toBeUndefined();
    // owner still sees it
    const ownerRes: any = await service.findOne(ASPIRANT_ID, {
      id: OWNER_USER_ID,
      role: "aspirant",
    });
    expect(ownerRes.whatsappNumber).toBe("9876543210");
  });

  it("includes both phone and whatsapp for everyone when both flags are true", async () => {
    aspirant.allowPhone = true;
    aspirant.allowWhatsapp = true;

    const res: any = await service.findOne(ASPIRANT_ID);

    expect(res.phone).toBe("9876543210");
    expect(res.whatsappNumber).toBe("9876543210");
  });
});
