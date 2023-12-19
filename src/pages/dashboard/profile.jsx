import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Tooltip,
  Button,
  Input,
  Select,
  Option,
  Badge,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { ProfileInfoCard } from "@/widgets/cards";
import { AuthProvider } from "../auth/Provider";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/Shared/Spinner";
import EmptyData from "@/Shared/EmptyData";
const apiUrl = "https://blood-bond-server-nine.vercel.app";
import { upazilas } from "@/data/upazilas-data";
import { districts } from "@/data/district-data";
import { UserContext } from "../auth/UserProvider";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export function Profile() {
  const [userEmail, setEmail] = useState("");
  const [userName, setName] = useState("");
  const [userAvatar, setAvatar] = useState("");
  const [userBloodGroup, setBloodGroup] = useState("");
  const [userDistrict, setDistrict] = useState("");
  const [userUpazila, setUpazila] = useState("");
  const { user } = useContext(AuthProvider);
  const { email } = user || {};
  const filteredUser = useContext(UserContext);

  if (filteredUser === undefined) {
    return <EmptyData></EmptyData>;
  }

  const { _id, name, avatar, bloodGroup, district, upazila, password } =
    filteredUser || {};

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = {
      email,
      name: userName,
      avatar: userAvatar,
      bloodGroup: userBloodGroup,
      district: userDistrict,
      upazila: userUpazila,
      password,
    };
    try {
      const response = await axios.put(
        `https://blood-bond-server-nine.vercel.app/user/${_id}`,
        updatedUser
      );
      console.log("User updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-40 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Badge color={user ? "green" : "brown"}>
                <Avatar
                  src={avatar}
                  alt="bruce-mars"
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
              </Badge>
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  Richard Davis
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  New User / Blood Bond
                </Typography>
              </div>
            </div>
            <div className="w-96">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    App
                  </Tab>
                  <Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Message
                  </Tab>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2">
            <ProfileInfoCard
              title="Profile Information"
              description={`Hi, I'm ${name}  Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term .`}
              details={{
                "first name": `${name}`,
                "Blood-Group": `${bloodGroup}`,
                location: `UpaZila- ${upazila}, District- ${district}`,
                social: (
                  <div className="flex items-center gap-4">
                    <i className="fa-brands fa-facebook text-blue-700" />
                    <i className="fa-brands fa-twitter text-blue-400" />
                    <i className="fa-brands fa-instagram text-purple-500" />
                  </div>
                ),
              }}
              action={
                <Tooltip content="Edit Profile">
                  <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                </Tooltip>
              }
            />

            {/* profile form */}

            <div className="w-full max-w-full px-3 shrink-0 md:flex-0">
              <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                  <div className="flex items-center">
                    <p className="mb-0 dark:text-white/80">Edit Profile</p>
                    <Button
                      size="md"
                      rounded="false"
                      block="false"
                      className="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in"
                    >
                      Settings
                    </Button>
                  </div>
                </div>
                <div className="flex-auto p-6">
                  <p className="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">
                    User Information
                  </p>
                  <form
                    className="w-full grid md:grid-cols-2 gap-4"
                    onSubmit={(e) => handleUpdate(e)}
                  >
                    <div className="mb-1 flex flex-col gap-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="-mb-3 font-medium"
                      >
                        Your email
                      </Typography>
                      <Input
                        size="lg"
                        placeholder={email}
                        value={email}
                        disabled
                        onChange={(e) => setEmail(e.target.value)}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>

                    <div className="mb-1 flex flex-col gap-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="-mb-3 font-medium"
                      >
                        Your name
                      </Typography>
                      <Input
                        required
                        size="lg"
                        value={userName}
                        placeholder={name}
                        onChange={(e) => setName(e.target.value)}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>

                    <div className="mb-1 flex flex-col gap-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="-mb-3 font-medium"
                      >
                        Avatar
                      </Typography>
                      <Input
                        required
                        size="lg"
                        placeholder={avatar}
                        value={userAvatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>

                    <div className="mb-1 flex flex-col gap-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="-mb-3 font-medium"
                      >
                        Blood Group
                      </Typography>
                      <Select
                        label={bloodGroup}
                        value={userBloodGroup}
                        animate={{
                          mount: { y: 0 },
                          unmount: { y: 25 },
                        }}
                        onChange={(selectedValue) =>
                          setBloodGroup(selectedValue)
                        }
                      >
                        {bloodGroups.map((group) => (
                          <Option key={group} value={group}>
                            {group}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div className="mb-1 flex flex-col gap-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="-mb-3 font-medium"
                      >
                        District
                      </Typography>
                      <Select
                        label={district}
                        animate={{
                          mount: { y: 0 },
                          unmount: { y: 25 },
                        }}
                        value={userDistrict}
                        onChange={(selectedValue) => setDistrict(selectedValue)}
                      >
                        {districts.map((d) => (
                          <Option key={d} value={d}>
                            {d}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div className="mb-1 flex flex-col gap-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="-mb-3 font-medium"
                      >
                        Upazila
                      </Typography>
                      <Select
                        label={upazila}
                        animate={{
                          mount: { y: 0 },
                          unmount: { y: 25 },
                        }}
                        value={userUpazila}
                        onChange={(selectedValue) => setUpazila(selectedValue)}
                      >
                        {upazilas.map((u) => (
                          <Option key={u} value={u}>
                            {u}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div className="col-span-2">
                      <Button type="submit" className="mt-6" fullWidth>
                        Update Profile
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
