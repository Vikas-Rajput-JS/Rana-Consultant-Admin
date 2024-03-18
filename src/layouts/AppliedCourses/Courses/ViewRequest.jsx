/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Card, Stack, Grid } from "@mui/material";

import ApiClient from "APIs/ApiClient";
import Loader from "Redux/Action/Loader";
import team1 from "assets/images/avatar1.png";
import team2 from "assets/images/avatar2.png";
import team3 from "assets/images/avatar3.png";
import team4 from "assets/images/avatar4.png";
// Images
import profile1 from "assets/images/profile-1.png";
import profile2 from "assets/images/profile-2.png";
import profile3 from "assets/images/profile-3.png";
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Footer from "examples/Footer";
import GreenLightning from "assets/images/shapes/green-lightning.svg";
import WhiteLightning from "assets/images/shapes/white-lightning.svg";
import linearGradient from "assets/theme/functions/linearGradient";
import colors from "assets/theme/base/colors";
import carProfile from "assets/images/shapes/car-profile.svg";
import LineChart from "examples/Charts/LineCharts/LineChart";
import { lineChartDataProfile1, lineChartDataProfile2 } from "variables/charts";
import { lineChartOptionsProfile2, lineChartOptionsProfile1 } from "variables/charts";
import CircularProgress from "@mui/material/CircularProgress";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import CarInformations from "layouts/profile/components/CarInformations";
// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

import Welcome from "layouts/profile/components/Welcome";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";
import Environment from "Environment/environment";

function ViewRequest() {
  const { id } = useParams();
  const [data, setdata] = useState({});
  const route = useLocation().pathname.split("/").splice(1, 1);
  const { gradients, info } = colors;
  const { cardContent } = gradients;
  console.log(route, "==================");
  const GetRequest = () => {
    Loader(true);
    ApiClient.get("course-request", { id }).then((res) => {
      if (res.success) {
        setdata(res?.data);
        Loader(false);
      }
    });
  };

  useEffect(() => {
    GetRequest();
  }, []);

  return (
    <DashboardLayout>
      <Header />
      <VuiBox mt={5} mb={3}>
        <Grid
          container
          spacing={3}
          sx={({ breakpoints }) => ({
            [breakpoints.only("xl")]: {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
          })}
        >
          <Grid
            item
            xs={12}
            xl={4}
            xxl={3}
            sx={({ breakpoints }) => ({
              minHeight: "400px",
              [breakpoints.only("xl")]: {
                gridArea: "1 / 1 / 2 / 2",
              },
            })}
          >
            <ProfileInfoCard
              title="Request information"
              //   description="Hi, I’m Mark Johnson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                "Course Name": data?.courseName,
                "Applied Date": moment(data?.createdAt).format("DD-MMM-YYYY"),
                Fees: data?.price || "--",
                "Total Fees": data?.course_id?.price,
                "College Location": data?.course_id?.address,
                "Course Status": data?.course_id?.status,
                "Application Status": data?.applicationStatus,
              }}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
            />
            {/* <Welcome /> */}
          </Grid>
          <Grid
            item
            xs={12}
            xl={5}
            xxl={6}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridArea: "2 / 1 / 3 / 3",
              },
            })}
          >
            <Card
              sx={({ breakpoints }) => ({
                [breakpoints.up("xxl")]: {
                  maxHeight: "400px",
                },
              })}
            >
              <VuiBox display="flex" flexDirection="column">
                <VuiTypography variant="lg" color="white" fontWeight="bold" mb="6px">
                  {route[0] == "view-request" ? "Course" : "Cars"} Information
                </VuiTypography>
                {/* <VuiTypography variant='button' color='text' fontWeight='regular' mb='30px'>
					Hello,! Your Car is ready.
				</VuiTypography> */}
                <Stack
                  spacing="24px"
                  background="#fff"
                  sx={({ breakpoints }) => ({
                    [breakpoints.up("sm")]: {
                      flexDirection: "column",
                    },
                    [breakpoints.up("md")]: {
                      flexDirection: "row",
                    },
                    [breakpoints.only("xl")]: {
                      flexDirection: "column",
                    },
                  })}
                >
                  <VuiBox
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    sx={({ breakpoints }) => ({
                      [breakpoints.only("sm")]: {
                        alignItems: "center",
                      },
                    })}
                    alignItems="center"
                  >
                    <VuiBox sx={{ position: "relative", display: "inline-flex" }}>
                      <CircularProgress variant="determinate" value={60} size={170} color="info" />
                      <VuiBox
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <VuiBox component="img" src={GreenLightning} />
                        <VuiTypography
                          color="white"
                          variant="h2"
                          mt="6px"
                          fontWeight="bold"
                          mb="4px"
                        >
                          68%
                        </VuiTypography>
                        <VuiTypography color="text" variant="caption">
                          Current Load
                        </VuiTypography>
                      </VuiBox>
                    </VuiBox>
                    <VuiBox
                      display="flex"
                      justifyContent="center"
                      flexDirection="column"
                      sx={{ textAlign: "center" }}
                    >
                      <VuiTypography
                        color="white"
                        variant="lg"
                        fontWeight="bold"
                        mb="2px"
                        mt="18px"
                      >
                        0h 58 min
                      </VuiTypography>
                      <VuiTypography color="text" variant="button" fontWeight="regular">
                        Time to full charge
                      </VuiTypography>
                    </VuiBox>
                  </VuiBox>
                  <Grid
                    container
                    sx={({ breakpoints }) => ({
                      spacing: "24px",
                      [breakpoints.only("sm")]: {
                        columnGap: "0px",
                        rowGap: "24px",
                      },
                      [breakpoints.up("md")]: {
                        gap: "24px",
                        ml: "50px !important",
                      },
                      [breakpoints.only("xl")]: {
                        gap: "12px",
                        mx: "auto !important",
                      },
                    })}
                  >
                    <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
                      <VuiBox
                        display="flex"
                        p="18px"
                        alignItems="center"
                        sx={{
                          background: linearGradient(
                            cardContent.main,
                            cardContent.state,
                            cardContent.deg
                          ),
                          minHeight: "110px",
                          borderRadius: "20px",
                        }}
                      >
                        <VuiBox display="flex" flexDirection="column" mr="auto">
                          <VuiTypography
                            color="text"
                            variant="caption"
                            fontWeight="medium"
                            mb="2px"
                          >
                            Course Name
                          </VuiTypography>
                          <VuiTypography
                            color="white"
                            variant="h4"
                            fontWeight="bold"
                            sx={({ breakpoints }) => ({
                              [breakpoints.only("xl")]: {
                                fontSize: "20px",
                              },
                            })}
                          >
                            {data?.courseName}
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            background: info.main,
                            borderRadius: "12px",
                            width: "56px",
                            height: "56px",
                          }}
                        >
                          <VuiBox component="img" src={carProfile} />
                        </VuiBox>
                      </VuiBox>
                    </Grid>
                    <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
                      <VuiBox
                        display="flex"
                        p="18px"
                        alignItems="center"
                        sx={{
                          background: linearGradient(
                            cardContent.main,
                            cardContent.state,
                            cardContent.deg
                          ),
                          borderRadius: "20px",
                        }}
                      >
                        <VuiBox display="flex" flexDirection="column" mr="auto">
                          <VuiTypography
                            color="text"
                            variant="caption"
                            fontWeight="medium"
                            mb="2px"
                          >
                            Price{" "}
                          </VuiTypography>
                          <VuiTypography
                            color="white"
                            variant="h4"
                            fontWeight="bold"
                            sx={({ breakpoints }) => ({
                              [breakpoints.only("xl")]: {
                                fontSize: "20px",
                              },
                            })}
                          >
                            {data?.course_id?.price}
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox sx={{ maxHeight: "75px" }}>
                          <LineChart
                            lineChartData={lineChartDataProfile1}
                            lineChartOptions={lineChartOptionsProfile1}
                          />
                        </VuiBox>
                      </VuiBox>
                    </Grid>
                    <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
                      <VuiBox
                        display="flex"
                        p="18px"
                        alignItems="center"
                        sx={{
                          background: linearGradient(
                            cardContent.main,
                            cardContent.state,
                            cardContent.deg
                          ),
                          borderRadius: "20px",
                          minHeight: "110px",
                        }}
                      >
                        <VuiBox display="flex" flexDirection="column" mr="auto">
                          <VuiTypography
                            color="text"
                            variant="caption"
                            fontWeight="medium"
                            mb="2px"
                          >
                            Start Date
                          </VuiTypography>
                          <VuiTypography
                            color="white"
                            variant="h6 "
                            fontWeight="bold"
                            sx={({ breakpoints }) => ({
                              [breakpoints.only("xl")]: {
                                fontSize: "20px",
                              },
                            })}
                          >
                            {moment(data?.course_id?.startDate).format("DD-MMM-YYYY")}
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            background: info.main,
                            borderRadius: "12px",
                            width: "56px",
                            height: "56px",
                          }}
                        >
                          <VuiBox component="img" src={WhiteLightning} />
                        </VuiBox>
                      </VuiBox>
                    </Grid>
                    <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
                      <VuiBox
                        display="flex"
                        p="18px"
                        alignItems="center"
                        sx={{
                          background: linearGradient(
                            cardContent.main,
                            cardContent.state,
                            cardContent.deg
                          ),
                          borderRadius: "20px",
                        }}
                      >
                        <VuiBox display="flex" flexDirection="column" mr="auto">
                          <VuiTypography
                            color="text"
                            variant="caption"
                            fontWeight="medium"
                            mb="2px"
                          >
                            End Date
                          </VuiTypography>
                          <VuiTypography
                            color="white"
                            variant="h6"
                            fontWeight="bold"
                            // sx={({ breakpoints }) => ({
                            //   [breakpoints.only("xl")]: {
                            //     fontSize: "100px",
                            //   },
                            // })}
                          >
                            {moment(data?.course_id?.endDate).format("DD-MMM-YYYY")}
                          </VuiTypography>
                        </VuiBox>
                        <VuiBox sx={{ maxHeight: "75px" }}>
                          <LineChart
                            lineChartData={lineChartDataProfile2}
                            lineChartOptions={lineChartOptionsProfile2}
                          />
                        </VuiBox>
                      </VuiBox>
                    </Grid>
                  </Grid>
                </Stack>
              </VuiBox>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            xl={3}
            xxl={3}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridArea: "1 / 2 / 2 / 3",
              },
            })}
          >
            <ProfileInfoCard
              title="User information"
              //   description="Hi, I’m Mark Johnson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                fullName: data?.userName,
                mobile: data?.user_id?.mobileNo || "--",
                email: data?.user_id?.email,
                location: data?.user_id?.address,
              }}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
            />
          </Grid>
        </Grid>
      </VuiBox>

      <Grid container spacing={3} mb="30px">
        <Grid item xs={12} xl={3} height="100%">
          {/* <PlatformSettings /> */}
          {/* <ProfileInfoCard
            title="Request information"
            //   description="Hi, I’m Mark Johnson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
            info={{
              "Applied Date": moment(data?.createdAt).format("DD-MMM-YYYY"),
              Fees: data?.price || "--",
              "Total Fees": data?.course_id?.price,
              "College Location": data?.course_id?.address,
            }}
            social={[
              {
                link: "https://www.facebook.com/CreativeTim/",
                icon: <FacebookIcon />,
                color: "facebook",
              },
              {
                link: "https://twitter.com/creativetim",
                icon: <TwitterIcon />,
                color: "twitter",
              },
              {
                link: "https://www.instagram.com/creativetimofficial/",
                icon: <InstagramIcon />,
                color: "instagram",
              },
            ]}
          /> */}
        </Grid>
        <Grid item xs={12} xl={12}>
          <Card>
            <VuiBox display="flex" flexDirection="column" height="100%">
              <VuiBox display="flex" flexDirection="column" mb="24px">
                <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
                  Documents
                </VuiTypography>
                <VuiTypography color="text" variant="button" fontWeight="regular">
                  Submited Documents by user
                </VuiTypography>
              </VuiBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultProjectCard
                    image={
                      data?.user_id?.adhaar ? Environment.LocalURL + data?.user_id?.adhaar : ""
                    }
                    // label="project #2"
                    title="Aadhar Card"
                    description="As Uber works through a huge amount of internal management turmoil."
                    action={{
                      type: "download",
                      route: data?.user_id?.adhaar
                        ? Environment.LocalURL + data?.user_id?.adhaar
                        : "",
                      color: "white",
                      label: "Download",
                    }}
                    authors={[{ image: team1, name: "Elena Morison" }]}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultProjectCard
                    image={
                      data?.user_id?.dmc12th ? Environment.LocalURL + data?.user_id?.dmc12th : ""
                    }
                    // label="project #1"
                    title="12th DMC"
                    description="Music is something that every person has his or her own specific opinion about."
                    action={{
                      type: "download",
                      route: data?.user_id?.dmc12th
                        ? Environment.LocalURL + data?.user_id?.dmc12th
                        : "",
                      color: "white",
                      label: "Download",
                    }}
                    authors={[{ image: team3, name: "Nick Daniel" }]}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultProjectCard
                    image={
                      data?.user_id?.dmc10th ? Environment.LocalURL + data?.user_id?.dmc10th : ""
                    }
                    // label="project #3"
                    title="10th DMC"
                    description="Different people have different taste, and various types of music."
                    action={{
                      type: "download",
                      route: data?.user_id?.dmc10th
                        ? Environment.LocalURL + data?.user_id?.dmc10th
                        : "",
                      color: "white",
                      label: "Download",
                    }}
                    authors={[{ image: team4, name: "Peterson" }]}
                  />
                </Grid>
              </Grid>
            </VuiBox>
          </Card>
        </Grid>
      </Grid>

      <Footer />
    </DashboardLayout>
  );
}

export default ViewRequest;
