import { expect, test, vi } from "vitest";
import { fetchData } from "./client.mjs";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      data: {
        boards: [
          {
            id: "microsemi-sf2-dev-kit-6b8a62b",
            name: "SF2_DEV_KIT",
            vendor: {
              name: "Microsemi",
              slug: "microsemi"
            },
            devices: [
              {
                name: "M2S050",
                id: "microsemi-m2s050"
              }
            ]
          },
          {
            id: "microsemi-sf2-adv-dev-kit-8ae1f78",
            name: "SF2_ADV_DEV_KIT",
            vendor: {
              name: "Microsemi",
              slug: "microsemi"
            },
            devices: [
              {
                name: "Microsemi",
                id: "microsemi-m2s150"
              }
            ]
          }
        ]
      }
    }
    ),
  })
);

test("fetched data is correctly processed", async () => {
  const response = await fetchData();
  expect(response).toEqual(
    {
      name: "root",
      count: 1,
      children: [
        {
          name: "Microsemi",
          count: 2,
          children: [
            {
              name: "SF2_DEV_KIT",
              count: 1,
              children: [{ name: "M2S050", count: -1, children: [] }]
            },
            {
              name: "SF2_ADV_DEV_KIT",
              count: 1,
              children: [{ name: "Microsemi", count: -1, children: [] }]
            }
          ]
        },
      ]
    }
  );
});
