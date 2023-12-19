import React, { useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";

import { statisticsCardsData } from "@/data";
import axios from "axios";
import Spinner from "@/Shared/Spinner";
import EmptyData from "@/Shared/EmptyData";
const apiUrl = "https://blood-bond-server-nine.vercel.app";

const TABLE_HEAD = [
  "Facility Name",
  "Blood Group",
  "Blood Group Number",
  "Component",
  "Action",
];

export function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userData, setUserData] = useState([]);
  const [bloodBagData, setBloodBagData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${apiUrl}/user`)
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/bloodBag`, {
        params: { page: currentPage, pageSize: 10 },
      })
      .then((response) => {
        setBloodBagData(response.data.data);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      });
  }, [currentPage]);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>

      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="mb-4 grid grid-cols-1 gap-6">
          {bloodBagData && bloodBagData.length > 0 ? (
            <Card className="h-full w-full">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                  <div>
                    <Typography variant="h5" color="blue-gray">
                      Facility Details
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                      These are details about the Facility that can provide
                      blood
                    </Typography>
                  </div>
                  <div className="flex w-full shrink-0 gap-2 md:w-max">
                    <div className="w-full md:w-72">
                      <Input
                        label="Search"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                      />
                    </div>
                    <Button className="flex items-center gap-3" size="sm">
                      <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />{" "}
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="overflow-scroll px-0">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bloodBagData.map(
                      (
                        {
                          _id,
                          avatar,
                          FacilityName,
                          bloodGroup,
                          BloodBagNumber,
                          Component,
                        },
                        index
                      ) => {
                        const isLast = index === bloodBagData.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";

                        return (
                          <tr key={_id}>
                            <td className={classes}>
                              <div className="flex items-center gap-3">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  {FacilityName}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {bloodGroup}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {BloodBagNumber}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Chip
                                  size="sm"
                                  variant="ghost"
                                  value={Component}
                                  color={
                                    Component === "paid"
                                      ? "green"
                                      : Component === "pending"
                                      ? "amber"
                                      : "red"
                                  }
                                />
                              </div>
                            </td>

                            <td className={classes}>
                              <Tooltip content="Edit User">
                                <IconButton variant="text">
                                  <PencilIcon className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </CardBody>
              <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <IconButton
                      key={index + 1}
                      variant={index + 1 === currentPage ? "outlined" : "text"}
                      size="sm"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </IconButton>
                  ))}
                </div>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <EmptyData></EmptyData>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
