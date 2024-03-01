import React from 'react';

import './App.css';
import {
  ChakraProvider, Flex, Image, Box, Text, Center, SimpleGrid, GridItem, Heading, Accordion,
  AccordionItem, AccordionButton, AccordionPanel, Button, AccordionIcon, Link, Grid, Divider, useClipboard, Show
} from '@chakra-ui/react';
import { MinusIcon, AddIcon, createIcon, CloseIcon } from '@chakra-ui/icons';
import { useRef, useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const linkIconSVG = () => (<svg xmlns="http://www.w3.org/2000/svg"
  height="22" viewBox="0 -960 960 960" width="22"><path fill="white" d="M450-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h170v60H280q-58.333 0-99.167 40.765-40.833 40.764-40.833 99Q140-422 180.833-381q40.834 41 99.167 41h170v60ZM325-450v-60h310v60H325Zm185 170v-60h170q58.333 0 99.167-40.765 40.833-40.764 40.833-99Q820-538 779.167-579 738.333-620 680-620H510v-60h170q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H510Z" /></svg>
);
const checkIconSVG = () => (<svg xmlns="http://www.w3.org/2000/svg"
  height="20" viewBox="0 -960 960 960" width="22"><path fill="white" d="m381-242 453-453-43-43-410 410-211-211-43 43 254 254Zm0 85L42-496l128-128 211 211 410-410 128 128-538 538Z" /></svg>
);
const textfont = "IBM Plex Mono";
const brandfont = "Azeret Mono";
const fontColor = "white";

const websiteLink = "https://resplendent-meringue-8a8ca4.netlify.app/";
const inviteId = "yDJ7azYWQ9";
const serverInviteLink = "https://discord.gg/" + inviteId;
// const paymentLink = "https://paypal.me/ycreter";
const paymentLink = "https://www.paypal.com/donate/?hosted_button_id=W9S7MWG44JE28";
// const contactLink = "mailto:contact@dailyuplift.com";
const voteLink = serverInviteLink;

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [icon, setIcon] = useState(linkIconSVG);

  //Get Discord Numbers
  const [memberCount, setMemberCount] = useState(0);
  useEffect(() => {
    const apiUrl = `https://discord.com/api/v9/invites/${inviteId}?with_counts=true&with_expiration=true;`

    const fetchMemberCount = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMemberCount(data.approximate_member_count);
      } catch (error) {
        console.error("Error fetching member count:", error);
      }
    };

    fetchMemberCount();
  }, []);

  //IFRAME LOADING SCREEN
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', () => {
        iframe.style.opacity = '100%';
      });
    }
  }, []);

  const { onCopy } = useClipboard(websiteLink);

  const handleCopyLink = () => {
    onCopy();
    setIcon(checkIconSVG);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChakraProvider>
      <Flex minH="100vh" fontFamily={textfont} w="100vw" h="auto" overflow="hidden" position={"relative"} alignItems={"center"} justifyContent={"center"}>
        {/* BACKGROUND */}
        <Image
          src="bg.webp"
          fallbackSrc='src="soft-rainbow-light-flares-background-or-overlay-2023-04-24-22-16-40-utc.jpg"'
          alt="bg"
          objectFit="cover"
          h="100%"
          w="100%"
          position="absolute"
          filter={"auto"}
          brightness={"0.5"}
        />
        <iframe ref={iframeRef} title="shapes" src='https://my.spline.design/untitled-fb3c918ebc2d7e5f3cf239e1e84c4f90/'
          width='100%' frameBorder='0' height='100%'
          style={{
            filter: "brightness(0.5)", width: '100%', height: '100%', position: "absolute", objectFit: "cover",
            opacity: "0%", transition: `opacity 5s ease -in -out`
          }} />

        {/* HEADER */}
        <SimpleGrid flexDirection={"row"}
          templateColumns={{ base: "1fr 0fr 1fr 1fr 1fr", md: "1fr 1fr 1fr 1fr 1fr" }}
          maxW="3000px"
          position={"absolute"} top={{ base: "4", lg: "8" }}
          w="100%" m="4" alignItems={"center"} zIndex="2"
          color={fontColor} pointerEvents={"none"}>
          <GridItem pointerEvents={"visible"} textAlign={"center"} zIndex="center">
            <Link href={websiteLink} isExternal>
              <Show above='sm'>
                <Text id="headerText" fontWeight={"bold"} align="center" fontSize="lg" fontFamily={brandfont}>
                  DAILY UPLIFT
                </Text>
              </Show>
              <Show below='sm'>
                <LogoIcon boxSize={6} />
              </Show>
            </Link>
          </GridItem>
          <GridItem />
          <GridItem pointerEvents={"visible"}>
            <Link href={paymentLink} isExternal>
              <Text id="headerText" align="center">

              </Text></Link>
          </GridItem>
          <GridItem pointerEvents={"visible"}>
            <Link href={paymentLink} isExternal>
              <Text id="headerText" align="center">
                DONATE
              </Text>
            </Link>
          </GridItem>
          <GridItem pointerEvents={"visible"}>
            <Link href={serverInviteLink} isExternal>
              <Text id="headerText" align="center">
                JOIN
              </Text>
            </Link>
          </GridItem>
        </SimpleGrid>

        {/* IMAGEZOOM */}
        {isOpen && (
          <Box position="fixed" top="0" left="0" right="0" bottom="0" bg="rgba(0,0,0,0.9)" zIndex={5} onClick={() => setIsOpen(false)}>
            <CloseIcon position={"absolute"} top="25px" right="25px" color="white" />
            <Center position="relative" w="100%" h="100%">
              <TransformWrapper>
                <TransformComponent>
                  <Image src="screenshot.webp" w="100%" p="2%" position="relative" />
                </TransformComponent>
              </TransformWrapper>
            </Center></Box>
        )}


        {/* CONTENT */}
        <Center px="50" w="100%" mt={{ base: "90px", md: "clamp(110px, 15vh, 120px)" }}
          mb={{ base: "110", lg: "110" }} maxW="2800px" alignItems={"center"}>

          {/* FROSTED GLASS */}
          <Box
            bg="rgba(255, 255, 255, 0.2)"
            borderRadius={"md"}
            backdropFilter="blur(30px)"
            w="100%"
            minH="60vh"
            p={{ base: "10", md: "20" }}
            borderColor={"rgba(255, 255, 255, 0.2)"}
            borderWidth={"0.6px"} pointerEvents={{ base: "visible", lg: "none" }}
          >

            {/* LAYOUT IN GLASS */}
            <SimpleGrid flexDirection={"row"}
              templateColumns={{ base: "1fr", lg: "1.5fr .15fr 1fr" }}>

              {/* WEB IMAGES*/}
              <Show above='lg'>
                <GridItem position={"relative"} w="100%">
                  <Image src="screenshot.webp" dropShadow={"lg"} fallbackSrc="screenshot.png" w="100%" borderRadius={"md"} zIndex={"1"}
                    onClick={() => setIsOpen(true)} pointerEvents={"all"} />
                  <Box filter="auto" dropShadow={"lg"} position="absolute" w="150%" left="-80%" top="0" zIndex={"-1"}>
                    <Image position="relative" src="leaves.png" fallbackSrc="leaves.png" maxH="100%" dropShadow={"lg"} />
                  </Box>
                  <Link href={serverInviteLink} isExternal pointerEvents={"all"}><Button size="sm" colorScheme='teal' color={fontColor} mt="10px">Join Server</Button></Link>
                </GridItem>
              </Show>
              <GridItem />

              <GridItem alignItems={"end"} zIndex={"1"}>
                <Text color={fontColor} mt={4} size="xs" fontWeight="light">
                  Your Discord Companion for Motivation and Good Vibes
                </Text>
                <Heading color={fontColor} size="3xl" fontFamily={brandfont} mt="2">
                  Daily Uplift
                </Heading>

                <Text color={fontColor} mt={8} fontSize="md">
                  Daily Uplift is a  <span className="brandname">Discord bot</span> designed to brighten your days with a touch of inspiration.
                  <br />
                  <span className="brandname">Get ready for a daily dose of positive messages delivered straight to your Discord DMs </span>
                  – a simple way to <span className="brandname">boost your mood and start your day with a smile.</span>
                </Text>

                {/* MOBILE IMAGES*/}
                <Show below='lg'>
                  <GridItem position={"relative"} w="100%" mt="8" flexFlow={"row"}>
                    <Link href={serverInviteLink} isExternal pointerEvents={"all"}><Button size="sm" colorScheme='teal' color={fontColor} mt="10px">Join Server</Button></Link>
                    <Image src="screenshot.webp" dropShadow={"lg"} top="0" fallbackSrc="screenshot.png" w="100%" borderRadius={"md"} zIndex={1}
                      onClick={() => setIsOpen(true)} />
                    <Box filter="auto" position="absolute" dropShadow={"lg"} top="0%" w="100%" zIndex={-1}>
                      <Image src="leaves.png" position={"relative"} fallbackSrc="leaves.png" left="-80%" maxWidth="120%" zIndex={-1} />
                    </Box>

                  </GridItem>
                </Show>

                <Box color={fontColor} mt={8} fontStyle="italic" fontSize="sm" display="grid" gridGap={4}>
                  <Text>
                    "Daily Uplift is like a little ray of sunshine in my inbox. It always makes me feel good!" - Sarah K.
                  </Text>
                  <Text>
                    "This bot has helped me shift my mindset and approach challenges with more optimism." - John D.
                  </Text>
                  <Text>
                    "I love the variety of messages. Sometimes it's a quote, other times a challenge – always uplifting!" - Maya R.
                  </Text>
                </Box>

                <Divider mt="8" borderWidth="5" borderColor={fontColor} />
                <Box pointerEvents={"all"}>
                  <Grid templateColumns={{ base: "1fr 4fr", sm: '1fr 3fr 1fr' }} flexDirection={"row"} gap={2} mt="4" color={fontColor} alignItems="center">
                    <GridItem>
                      <Image src="logo-4-fullscreen.png" w="100%"/*  maxW="200px"  */ borderRadius="full" minH="10" minW="10" />
                    </GridItem>
                    <GridItem ml="1">
                      <Heading size="md" fontFamily={brandfont}> Daily Uplift</Heading>
                      <Text size="sm"> {memberCount} 1-Up Members</Text>
                    </GridItem>
                    <GridItem colSpan={{ base: 2, sm: 1 }}>
                      <SimpleGrid templateColumns={"1fr 1fr 1fr"} flexDirection={"row"} gap={1}>
                        <GridItem><Link href={serverInviteLink} isExternal><Button size="sm" colorScheme='teal' color={fontColor}>Join</Button></Link></GridItem>
                        <GridItem><Link href={voteLink} isExternal><Button size="sm" colorScheme='teal' color={fontColor}> Vote</Button></Link> </GridItem>
                        <GridItem> <Button onClick={handleCopyLink} size="sm" colorScheme='teal' color={fontColor}> {icon} </Button></GridItem>
                      </SimpleGrid> </GridItem>
                  </Grid>
                  <Divider mt="4" borderWidth="5" borderColor={fontColor} />

                  <Heading color={fontColor} mt={8} size="md" fontWeight="normal" fontFamily={brandfont}>
                    Common Questions
                  </Heading>
                  <Accordion allowMultiple color={fontColor} borderColor={fontColor} mt={4}>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex='1' textAlign='left' fontStyle={"italic"}>
                            How it works?
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4} fontWeight={"light"}>
                        <ol>
                          <li>
                            Join our discord server.
                          </li>
                          <li>
                            Use command /help
                          </li>
                          <li>
                            Setup your notifications with instructions.
                          </li>
                          <li>
                            Start each day with a positive message directly in your Discord DMs.
                          </li>
                        </ol>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                      {({ isExpanded }) => (
                        <>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex='1' textAlign='left' fontStyle={"italic"}>
                                Is Daily Uplift free?
                              </Box>
                              {isExpanded ? (
                                <MinusIcon fontSize='12px' />
                              ) : (
                                <AddIcon fontSize='12px' />
                              )}
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4} fontWeight={"light"}>
                            Yes, Daily Uplift is absolutely free to use.
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                    <AccordionItem>
                      {({ isExpanded }) => (
                        <>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex='1' textAlign='left' fontStyle={"italic"}>
                                Can I customize messages?
                              </Box>
                              {isExpanded ? (
                                <MinusIcon fontSize='12px' />
                              ) : (
                                <AddIcon fontSize='12px' />
                              )}
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4} fontWeight={"light"}>
                            While you can't fully customize the messages yet, we offer a wide variety of quotes, affirmations, and challenges.
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                  </Accordion>
                </Box>
              </GridItem>
            </SimpleGrid>
          </Box>
        </Center>

        {/* NOISE FILTER */}
        {/* <svg 
  xmlns='http://www.w3.org/2000/svg'
  style={{position:"absolute", height:"100%", width:"100%", mixBlendMode:"color-burn", objectFit:"cover", pointerEvents:"none"}}>
  <filter id='noiseFilter'>
    <feTurbulence 
      type='fractalNoise' 
      baseFrequency='5.95' 
      numOctaves='3' 
      stitchTiles='stitch' />
  </filter>

  <rect
    width='100%' 
    height='100%' 
    filter='url(#noiseFilter)' />
</svg> */}

      </Flex>
    </ChakraProvider>
  );
}

export default App;


const LogoIcon = createIcon({
  displayName: 'logo',
  viewBox: '0 0 867.18 859.24',
  path: (
    <g>
      <path d="m866.29,404.01C841.06-6.83,309.81-147.9,75.27,186.67-79.43,405.33,15.27,716.69,259.32,821.6c290.31,131.34,627.46-98.67,606.97-417.59Zm-748.62,33.16c6.33-10.47,12.18-20.56,12.92-32.96.54-5.14,3.61-10.05,1.13-15.14-7.94,3.19-7.83,13.16-9.8,20.49-1.51,7.91-6.95,15.08-11.03,23.23-17.34-10.83-32.45-18.43-51.18-25.17-2.87-16.14,2.65-29.97,15.11-41.64,9.01-9.46,16.39-20.78,28.48-26.8,8,.12,15.69,8.32,22.9,11.83h0c-15.33,10.16-20.25-9.41-27.65-.67-4.03,5.55-9.92,8.93-12.82,15.37,9.44,1.05,12.93-7.04,18.16-9.81,10.76,3.77,20.17,13.62,26.46-1.12,16.63,9.31,28.83,23.96,45.28,33.26,9.67,5.46,19.4,10.9,28.57,17.13,3.89,2.64,6.93,6.96,9.51,11.05,7.54,11.96,17.39,21.52,28.38,30.29,13.73,11.67,29.71,23.18,38.15,39.33-13.39-1.71-26.45-4.94-39.83-6.06-7.46-.5-9.83-5.56-11.92-10.78-5.24-13.09-13.82-23.84-23.36-33.78-4.69-4.89-7.94-9.57-7.91-16.59.02-5.55-4.14-8.63-8.33-11.83-10.74-8.08-18.67-17.9-31.33-23.64.7,7.05,2.59,11.38,8.46,14.97,6.9,4.21,12.5,10.62,18.37,16.38,3.83,5.85.38,13.43,7.38,18.52,11.96,10.55,15.07,24.63,19.44,39.41-10.55-3.83-19.81-7.14-29.01-10.62-1.11-.42-2.47-1.61-2.71-2.66-2.16-9.76-5.79-19.59-5.64-29.35.33-20.67-21.85-32.4-34-45.51-3.14,16.3-13.4,28.98,2.14,41.86,4.16,5.43,1.88,12.98,2.35,19.35-.03,4.58-1.01,5.42-5.2,3.33-7.1-3.56-13.98-7.56-21.48-11.67Zm70.7-93.32s-.08.02-.08.02c3.33-2.3,6.9-4.27,10.06-6.78,4.1-3.08,2.64-3.62,7.09.82l-.03-.03c11.06,7.44,20.74,18.24,33.46,22.72,25.66,6.41,49.03,18.36,72.4,30.08,34.28,21.31,65.91,44.64,100.53,66.92-6.77,5.32-12.83,11.07-19.79,15.33-12.04,7.37-8.11,7.11-18.53-1.4-45.46-38.2-94.46-71.7-147.88-97.77-13.31-6.27-27.81-16.85-42.5-8.01,70.41,27.24,124.91,76.54,180.64,126.75-6.87,3.09-12.6,6.21-18.7,8.15-12.09-1.09-24.29-6-31.51-16.49-2.32-2.99-6.42-5.17-10.15-6.36-9.16-2.93-13.85-10.93-20.36-16.81-18.46-19.68-42.06-34.42-57.52-56.69-4.82-7.49-11.41-11.8-19.37-15.56-17.62-8.32-35.57-16.38-50.06-31.26,10.58-4.93,21.18-9.79,32.24-13.59.02.01.04.03.06.04,0-.02,0-.05.01-.07Zm451.96-3.97h0s0,0,0,0h0Zm6.46,104.38c-8.44.39-16.36.75-24.94,1.15-2.15-20.18-4.44-41.57-6.86-64.24-1.22,1.33-2.41,2.01-2.56,2.87-4.53,24.02-7.42,48.39-13.06,72.17-13.16,12-30.61,20.15-45.36,30.54-4.44,2.81-9.24,5.05-14.61,6.97,31.25-36.93,47.26-80.78,60.34-126.01-.36-.2-.72-.4-1.09-.6-21.5,46.19-56.56,83.89-85.75,125.24-9.89,13.61-24.28,21.24-37.37,30.67-7.57,2.32-15.1-1.9-23.77-2.62,26.47-24.5,51.19-47.71,72.84-76.19,19.59-25.82,42.29-49.97,54.4-80.5-.51-.23-1.03-.46-1.54-.69-17.88,36.83-52.29,61.58-81.54,88.95-25.39,20.4-49.03,42.9-74.54,63.12-9.37.53-18.73,1.07-28.11,1.12.05-.41.09-.82.14-1.23,16.09-12.72,31.73-26.12,46.52-40.31,10.89-18.39,23.64-34.72,44.66-42.3,4.07-1.67,7.17-3.89,8.79-7.84,3.05-7.48,9.61-11.19,15.71-15.63,13.38-9.74,26.77-19.51,39.53-30.02,3.93-3.24,5.7-9.03,8.7-13.5,1.97-3.31,5.42-5.8,7.01-9.3,2.78-14.47,14.66-22.68,21.01-35.48,5.65,4.75,5.81,9.08,14.09,11.92,7.1,3.15,14.39,5.92,21.31,9.42,13.1,13.64,18.81,35.15,29.49,51.1,4.78,7.52,10.46,15.44,16.72,21.72,6.3.14,9.67,4.96,12.7,9.07,14.58,17.42,36.48,25.14,54.07,38.74-.15.46-.3.92-.46,1.38-11.32.69-22.45-.98-33.65-2.29-9.48-.84-15.74-6.88-21.35-13.46-20.72-24.55-41.9-49.5-54.01-79.66-.09-.24-.51-.35-2.22-1.46,6.82,27.04,14.82,52.34,24.76,77.17Zm-270.4,66.06c-1.5,1.06-4.66-.21-7.05-.4-.11-.55-.22-1.1-.33-1.65l30.26-18.13c.38.57.76,1.13,1.14,1.7-7.96,6.22-15.79,12.63-24.02,18.48Zm191.03-193.34c-5.85,9.04-11.85,17.98-17.5,27.15-4.12,6.69-6.63,14.74-11.88,20.28-13.66,13.6-28.24,23.88-44.57,34.91,1.45-15.98,20.97-16.04,19.1-32.23.15-9.75,23.82-27.27,30.97-35.63,7.74-5.7,10.66-.55,17.76-10.41-5.31-.75-11.39,1.78-15.42-2.91-8.47-9.6-14.98,20.81-31.98,15.94-23.52-.7-14.84-1.43-24.25,11.91-6.08,4.91-12.42,9.54-20.45,10.92-4.04.7-6.38,2.43-7.09,7.22-2.33,10.04-10.87,16.36-15.87,25.67,21.68-5.16,19.13-20.07,35.78-25.89,7.29-1.98,13.39-6.06,18.56-11.62,1.25-1.34,3.27-1.96,5.27-2.47-6.42,9.91-2.52,21.14-7.09,24.43-9.29,5.07-13.14,10.4-17.37,19.84-10.24,12.48-20.33,25.1-31.13,37.08-3.34,3.71-9.11,5.11-13.11,8.38-7.38,6.03-13.53,5.69-21.33-.09-12.97-10.57-28.88-17.09-41.2-28.29,18.43-12.99,36.7-25.87,54.98-38.75.38.32.76.64,1.14.96-2.4,3.73-4.8,7.47-7.19,11.2l.78.98c7.47-3.43,12.36-9.81,18.22-15.19,5.05-2.72,12.23-4.16,15.26-9.66,8.78-15.71,17.8-31.14,32.34-42.46,2.3-1.79,4.55-4.15,5.75-6.74,5.56-12.23,21.23-9.07,32.29-13.66-4.42,7.51-12.1,8.01-18.84,10.27-4.97-1.53-6.58,4.34-10.09,6.64h0c-6.14,6.37-12.29,12.74-19.1,19.81,8.64-1.94,13.63-7.96,19.45-12.69-.06-1.22-.12-2.43-.18-3.65.06,1.22.12,2.43.18,3.65,11.36-7.91,10.6-11.85,25.77-11.83,5.08-4.99,10.02-9.24,14.84-14.64,8.59,8.49,19.38,12.87,29.97,17.53-.92,1.35-1.84,2.69-2.76,4.04Zm-32.14-38.95c-.02.95-2,2.38-3.3,2.7-14.02,4.64-30.36,4.96-43.14,12.22-7.17,7.7-13.64,16.14-21.34,23.26-9.81,7.84-13.04,20.95-23.04,27.97-4.91,2.36-10.48,7.42-16.12,6.24-16.35-7.77-32.66-15.65-48.83-23.8-11.37-5.73-20.02-14.97-28.81-23.87-4.65-5.54-10.95-.66-16.85-1.08-.79.03-2.03-1.34-2.39-2.32-4.41-11.86-7.76-23.95-7.35-31.86,3.46-159.33,225.5-145.32,211.18,10.54Zm-209.98,41.13c6.04-1.65,12.07-3.29,18.11-4.94,11.25,7.7,20.08,18.75,31.38,26.18,13.17,8.83,28.48,12.39,40.86,22.92-10.39,7.09-19.63,13.39-28.62,19.53-18.78-8.43-30.7-24.26-44.24-39.54-14.68,19.88-13.05,5.66-24.24,15.1-3.09,3.43-6.55,6.51-10.53,10.4h3.28c7.7-4.76,14.98-8.46,24.25-7.05,16.03-2.07,16.31,19.32,43.69,23.21.71.15,1.31.86,2.38,1.59-5.56,2.78-19.55,17.46-24.2,14-24.93-15.98-47.87-32.2-76.11-42.67,31.65-15.01,17.88-34.36,43.98-38.72Zm-174.9,120.65c2.02-23.6-15.04-16.91-7.79-44.65,33.19,23.63,14.81,32.78,26.66,63-15.39-5.63-20.37.03-18.87-18.35Zm26.02,248.17c-1.31,1.63-2.62,3.26-4.75,5.92-9.99-10.59-19.77-20.96-29.55-31.33.13-.47.27-.94.4-1.41,14.35-.82,28.71-1.65,44.55-2.56-4.62,6.18-8.35,11.32-12.24,16.34-4.94,6.38-4.81,8.11,1.59,13.05Zm585.08-79.99c-3.39,7.34-6.65,14.16-16.15,12.12h0c-47.24,3.12-94.74,2.51-142.07,3.83-49.41,3.69-98.92,6.12-148.4,9.02,77.47,2.82,157.23-.53,235.47-.14h0c18.43.21,36.95-.66,55.33.5-2.88,4.63-6.13,9.11-9.62,13.27-10.25,5.76-25.15-.01-36.68,3.36,4.41,15.34,12.33,10.23,25.98,10.98-7.36,8.27-14,15.74-20.45,22.99-4.27-5.93-8.32-11.56-12.38-17.19,4.45-4.09,4.48-5.5.41-10.84-5.25-6.91-10.45-13.86-15.67-20.8-1.29-.02-2.58-.04-3.87-.06-6.35,8.93-12.83,17.76-18.98,26.82-3.75,5.06.13,8.21,5.44,9.78-4.54,7.6-18.53,16.49-6.53,23.33-3.76,5.78-7.51,11.51-11.2,17.27-2.34,4.57-5.31-1.12-8.26-2.49,6.91-4.09,7.04-4.72,2.88-10.94-2.45-3.66-4.93-7.3-7.54-11.17,7.21-5.63-7.45-19.08-9.96-25.51-.92.02-1.84.05-2.76.07-4.09,5.78-8.27,11.49-12.21,17.37-1.53,2.27-4.12,4.89.23,7.31.46.25.22,2.72-.39,3.73-4.03,7.48-15.2,14.97-2.83,20.9-2.48,5.19-16.05,15.28-8.35,20.05,4.4,3.13-2.09,4.62-1.61,8.23-3.9-3.22-7.03-5.81-9.87-8.15,5.61-4.38,5.81-6.03,1.58-11.48-5.04-5.33-3.71-8.92-5.03-14.84-2.31-4.68-5.36-9-8.25-13.37-4-7.48-13.29,10.79-16.73,13.59-3.49,4.59-3.36,4.69,1.68,8.58-3.03,4.67-14.75,11.97-5.93,16.75.68.32,1.1,1.17,1.62,1.75-5.69,8.51-7.49,8.31-14.93-1.57,1.62-1.21,4.25-2.19,4.6-3.69-.14-4.55-6.03-10.12-8.09-13.47.51-2.52,1.81-4.89,1.11-6.14-3.32-5.91-7.18-11.51-11.51-18.23-5.28,6.9-10.01,12.67-14.15,18.84-.81,1.21.66,3.96,1.08,6,.55-.01,1.1-.03,1.65-.04-1.98,2.74-3.94,5.48-5.93,8.21-4.12,5.63-4,6.19,2.3,10.13-2.67,3.7-5.56,7.26-7.88,11.17-.87,2.73,1.13,7.05.13,10.01-2.18,4.33-8.45,8.29-.09,12.11-41.81,4.77-84.5.22-126.73,1.87-12.77.06-23.69-6.14-35.48-9.36-.67-.18-1.13-1.16-1.35-1.4,1.83-1.8,3.6-3.52,6.08-5.96,47.94-.35,98.6,1.09,147.08.74.71-3.65-1.67-6.09-2.9-10.23-42.99,2.65-86.7,1.11-129.83,2.4-12.06.37-21.98,3.99-31.08-6.21,5.69-4.36,9.15-4.15,2.09-11.09-5.21-5.02-10.59-9.87-16.2-15.07,19.45-4.8-2.28-19.81-7.4-28.33,5.57-3.09,5.85-3.98,2.02-9.87-3.69-3.54-14.66-28.69-19.79-20.73-6.19,7.86-12.68,15.5-18.61,23.54-4.6,6.23-4.3,6.45,2.9,11.18-5.13,8.51-23.62,22.04-4.54,26.35-5.61,5.08-9.69,17.93-18.51,14.64-10.34-5.3-22.04-9-31.25-16.07,2.25-1.69,5.4-2.89,5.83-4.71-.94-8.37-9.26-15.46-13.42-22.72,4.74-3.42,4.96-4.57,1.61-9.64-3.59-6.07-8.52-11.3-11.08-17.9,75.19-7.61,151.65-10.56,224.57-31.52,10.03-1.84,12.59-14.32,2.56-18.34-21.88-11.54-45.85-17.61-69.38-24.75-4.46-1.91-9.95-1.51-13.07-5.76,34.52-2.41,68.78-2.13,103.45-2.05-8.36,8.93-1.05,10.46,7.67,10.94,14.02.73,28.05,1.24,42.06,2.06,35.05,3.24,69.63,2.5,104.46,8.43-12.16,3.75-24.77,1.04-37.32,2.62-34.72,4.03-69.98,2.04-104.49,7.28,0,0,0,.11,0,.16,0-.05,0-.16,0-.17-2.88-.42-5.76-.85-8.65-1.27-.03.69-.07,1.37-.1,2.06,104.07-1.21,208.52-2.02,312.51-.66-.3.53-.6,1.05-.89,1.58Zm46.89-170.07c-.3,1.42-.05,2.96-.05,5.74-39.85-14.4-78.43-30.09-113.31-53.94,5.03,8.42,12.11,14.7,20.12,19.64,22.33,14.57,46.85,26.76,68.33,42.07-7.5,1.86-14.7,4.28-22.08,5.18-3.05.37-6.72-2.14-9.71-3.97-16.05-9.84-32.23-19.52-47.85-30.03-35.82-28.26-44.5-42.03-63.52-82.74,0,0,.09.08.11.1,0,0,0,0,0,0,0,0,0,0,0,0,.02-.04.03-.09.05-.13-.04,0-.07.02-.11.02-5.3-11.87-16.64-14.27-27.59-18.71,14.23-14.98,13.14,4.06,22.73-10.19-3.5-.33-7.11-.24-10.49-1.1-13.13-3.79-16.62,17.36-28.8.73,8.58-1.36,24.18-9.97,31.33-6.09,10.17,6.31,23.76,5.67,30.03,17.5,5.54,12.06,13.99,22.65,26.6,27.8,7.7,3.88,16.03,6.54,23.52,10.75,16.04,17.26,30.82,37.78,51.57,50.15,9.18,5.47,19.53,8.97,29.41,13.25,6.17,4.32,21.41,3.99,19.7,13.98Zm-31.03-36.57c-20.2-9.15-34.87-24.93-48.71-41.6-4.68-5.58-8.54-12.2-15.7-14.88-9.85-4.64-20.41-8.15-29.45-14.02-22.9-19.56-8.7-26.89-46.43-39.73-27.26-14.57-47.48,23.68-85.62-2.5,30.34-213.43-293.61-195.57-238.1,16.25-12.29,3.07-16.05,8.6-21.35,19.14-7.12,12.21-18.4,24.22-32.69,25.82-21.51-3.48-40.31-13.75-55.74-29.24-2.73-2.4-5.07-3.01-8.73-.98-14.23,7.97-29.05,15.18-43.43,22.76-11.54,11.25-30.39-10.28-41.17-15.93-12.11-7.89-33.45,13.91-40.72,22.9-.8.86-1.41,2.01-2.84,1.45C101.36,178.76,269.71,50.14,444.42,58.28c194.85,5.24,357.8,159.85,364.61,356.23-11.28-4.66-21.61-8.6-31.67-13.15Z" fill="#f7f7f7" />
      <path d="m171.86,360.74c.36.53.72,1.05,1.08,1.58,11.3-1.43,16.63-14.83,28.71-13.15,1.05-3.07,1.86-5.41,2.81-8.21-5.01.77-12.44,5.98-16.11,2.96-1.54,6.19-12.03,11.71-16.5,16.82Z" fill="#f7f7f7" />
      <path d="m510.12,679.01c-44.33,1.55-88.64,3.7-133.01,2.95-.05.59-.1,1.18-.16,1.77,68.44,5.2,137.87,2.31,206.63,2.45,6.4.03,7.12-3.21,7.84-8.01-27.11-.35-54.19.62-81.31.85Z" fill="#f7f7f7" />
      <path d="m423.6,722.94c-26.58,1.25-53.78-.74-80.04,2.95,2.03,1.25,4.01,1.99,6.01,2.03,26.02.56,52.06.73,78.04,1.98,18.49.14,36.99.11,55.48,0,4.39-.82,3.87-5.3,5.01-9.38-21.59,1.49-42.92,2.02-64.5,2.43Z" fill="#f7f7f7" />
      <path d="m436.78,701.99c-33.28.17-66.56.98-99.85.97-.04.3-.09.6-.13.9,30.52,4.41,62.31,2.24,93.26,4.09,18.91.39,37.82.79,56.74.95,5.66.05,11.37-.63,12.76-6.94-20.72,0-41.75-.13-62.77.03Z" fill="#f7f7f7" />
      <path d="m399.08,658.1c-.01.51-.02,1.03-.03,1.54,73.45.46,146.91.15,220.36.67,7.65-.09,15.31-.1,22.96-.33,5.09.24,7.06-6.2,9.26-9.05-84.22-.7-168.38,5.1-252.54,7.17Z" fill="#f7f7f7" />
      <path d="m136.64,373.34c1.55-2.86,2.83-5.87,4.23-8.82-.45-.28-.89-.57-1.34-.85-5.92,3.6-12.73,16.08-20.29,11.94-7.57-2.16-11.42-4.45-16.38-10.41-11.04,12.81-21.86,25.36-32.58,37.79,15.03,6.49,26.98-18.62,37.07-27.15,14.19,13.34,17.49,12.77,29.29-2.51Z" fill="#f7f7f7" />
      <path d="m654.36,350.98c3.19,7.48,8.39,1.85,14.01.95-.11-.65-.06-1.6-.42-1.78-6.11-3.19-7.33-9.73-10.49-14.95-2.04-3.37-4.43-6.53-6.99-10.26-4.7,5.42-8.17,8.52-9.98,14.91,2.69-.57,5.37-1.15,7.79-1.66,2.04,4.34,3.82,8.7,6.08,12.8Z" fill="#f7f7f7" />
      <path d="m668.39,352.02s.03.02.05.03c.03-.05.05-.11.08-.16-.05.01-.1.02-.14.04,0,.03,0,.06.01.09h0Z" fill="#f7f7f7" />
      <path d="m664.46,369.19c2.87.05,6.63-4.2,8.92-6.37,3.39,1.82,7.2,6.1,8.84-1.41-4.38-3.4-8.73-6.94-13.78-9.35-1.87,3.65-3.3,7.65-5.78,10.81-2.74,3.49.08,4.83,1.8,6.32Z" fill="#f7f7f7" />
      <path d="m368.38,359.33c6.63,3.76,13.47-2.41,19.8-4.44-1.84-1.09-4.88-2.2-6.77-1.69-12.62,4.48-13.88-14.86-29.69-4.38,5.27,4.32,10.75,7.34,16.66,10.5Z" fill="#f7f7f7" />
      <path d="m326.21,335.7c-4.8,2.48-9.47,5.2-14.2,7.81.15.47.31.93.46,1.4,1.68-.14,3.37-.49,5.03-.39,7.29.42,12.81-6.54,20.44-4.88,2.84-.64,3.34-4.91,4.3-7.43-8.73-2.18-9.46-2.02-16.03,3.49Z" fill="#f7f7f7" />
      <path d="m314.03,332.6c6.14-1.3,11.81-4.67,17.72-6.28,5.12-.8,7-4.14,8.42-8.31-11.69,1.29-18.57,5.07-26.87,13.26.25.44.49.88.74,1.32Z" fill="#f7f7f7" />
    </g>
  ),
})