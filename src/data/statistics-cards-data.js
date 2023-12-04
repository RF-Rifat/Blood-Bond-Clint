import {
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: UsersIcon,
    title: "Total User",
    value: "4",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "active user 50",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Total Donor ",
    value: "6",
    footer: {
      color: "text-green-500",
      value: "pending 3",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Total Request",
    value: "1",
    footer: {
      color: "text-red-500",
      value: "pending 3",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Foun",
    value: "$104",
    footer: {
      color: "text-green-500",
      value: "5",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
