import React from 'react';

import './App.css';
import { ChakraProvider, Flex, Image, Box, Text, Center, SimpleGrid, GridItem, Heading,  Accordion,
  AccordionItem,AccordionButton,AccordionPanel, Button, AccordionIcon, Link, Grid, Divider,useClipboard, Show } from '@chakra-ui/react';
  import { MinusIcon, AddIcon} from '@chakra-ui/icons';
  import { useRef, useEffect, useState} from 'react';
  const users = 2000;
  const linkIconSVG = () => (<svg xmlns="http://www.w3.org/2000/svg" 
  height="22" viewBox="0 -960 960 960" width="22"><path d="M450-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h170v60H280q-58.333 0-99.167 40.765-40.833 40.764-40.833 99Q140-422 180.833-381q40.834 41 99.167 41h170v60ZM325-450v-60h310v60H325Zm185 170v-60h170q58.333 0 99.167-40.765 40.833-40.764 40.833-99Q820-538 779.167-579 738.333-620 680-620H510v-60h170q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H510Z"/></svg>
  );
  const checkIconSVG = () => (<svg xmlns="http://www.w3.org/2000/svg" 
  height="22" viewBox="0 -960 960 960" width="22"><path d="m381-242 453-453-43-43-410 410-211-211-43 43 254 254Zm0 85L42-496l128-128 211 211 410-410 128 128-538 538Z"/></svg>
  );
  

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [icon, setIcon] = useState(linkIconSVG);

  //IFRAME LOADING SCREEN
    useEffect(() => {
      const iframe = iframeRef.current;
      if (iframe) {
          iframe.addEventListener('load', () => {
              iframe.style.opacity = '100%';
          });
      }
  }, []);

  const { onCopy } = useClipboard("https://magikarp.com/");

  const handleCopyLink = () => {
    onCopy();
    setIcon(checkIconSVG);
  };

  return (
    <ChakraProvider>
    <Flex minH="100vh" w="100vw" h="auto" overflow="hidden"  position={"relative"} alignItems={"center"} justifyContent={"center"}>

      {/* BACKGROUND */}
      <Image
        src="bg.webp"
        fallbackSrc='src="soft-rainbow-light-flares-background-or-overlay-2023-04-24-22-16-40-utc.jpg"'
        alt="bg"
        objectFit="cover"
        h="100%"
        w="100%"
        position="absolute"
      />
      <iframe ref={iframeRef} title="shapes" src='https://my.spline.design/untitled-fb3c918ebc2d7e5f3cf239e1e84c4f90/'
      width='100%' frameBorder='0' height='100%'
      style={{ width:'100%', height:'100%', position:"absolute", objectFit:"cover",
      opacity:"0%", transition: `opacity 5s ease-in-out`}}/>
      
      {/* HEADER */}
        <SimpleGrid flexDirection={"row"} templateColumns={{base:"1fr .2fr 1fr 1fr 1fr",sm:"1fr 1fr 1fr 1fr 1fr"}} maxW="3000px"
        position={"absolute"} top={{base: "4", lg:"8"}} w="100%" m="4" alignItems={"center"} zIndex="0"
  color="white" pointerEvents={"none"}>
    <GridItem pointerEvents={"visible"}> 
        <Link href="https://magikarp.com/" isExternal>
          <Text id="headerText" align="center" fontWeight={"bold"}>
              DAILY UPLIFT
          </Text>
        </Link>
      </GridItem>
      <GridItem/> 
      <GridItem pointerEvents={"visible"}> 
          <Text id="headerText" align="center">
             MISSION
          </Text>
      </GridItem>
      <GridItem pointerEvents={"visible"}> 
          <Text id="headerText" align="center">
              CONTACT
          </Text>
      </GridItem>
      <GridItem pointerEvents={"visible"}>  
          <Text id="headerText" align="center">
              JOIN
          </Text>
      </GridItem>
    </SimpleGrid>


      {/* CONTENT */}
      <Center px="50" w="100%" mt={{base:"110", lg:"0"}}  mb={{base:"110", lg:"0"}} maxW="2800px" alignItems={"center"}>

      {/* FROSTED GLASS */}
      <Box
          bg="rgba(255, 255, 255, 0.2)"
          borderRadius={"md"}
          backdropFilter="blur(30px)"
          w="100%"
          minH="60vh"
          p="10"
          borderColor={"rgba(255, 255, 255, 0.2)"}
          borderWidth={"0.6px"} pointerEvents={{base:"visible", lg:"none"}}
        >
          
          <SimpleGrid flexDirection={"row"} templateColumns={{base:"1fr", md:"1.5fr .3fr 1fr"}}>
            {/* WEB */}
            <Show above='md'>
            <GridItem position={"relative"} w="100%">
            <Image src="screenshot.png" dropShadow={"lg"} fallbackSrc="screenshot.png" w="100%" borderRadius={"md"} zIndex={"1"}/>
            <Box filter="auto" dropShadow={"lg"} position="absolute" w="150%" left="-80%" top="0" zIndex={"-1"}>
                <Image position="relative" src="leaves.png" fallbackSrc="leaves.png" maxH="100%"  dropShadow={"lg"}/>
             </Box>
             <Box position="absolute" >
             </Box>
            </GridItem>
            </Show>

            <GridItem/>
            <GridItem alignItems={"end"} zIndex={"1"}>
            <Text color="white" mt={4} size="xs" fontWeight="light">
                Start your day with a smile to your inbox
            </Text>
            <Heading color="white" /* mt={4} */ size="3xl">
                DAILY UPLIFT
          </Heading>

          <Text color="white" mt={8} fontSize="md">
            DAILY UPLIFT is a Discord bot that sends you positive messages every day via Discord DM. It’s designed to help brighten your day and provide a daily dose of positivity and motivation. With Daily Uplift, you can start each day with an uplifting message and a smile on your face.
          </Text>

          {/* MOBILE */}
          <Show below='md'>
            <GridItem position={"relative"} w="100%" mt="8" flexFlow={"row"}>
            <Image src="screenshot.png" dropShadow={"lg"} top="0" fallbackSrc="screenshot.png" w="100%" borderRadius={"md"} zIndex={1}/>
              <Box filter="auto" position="absolute"  dropShadow={"lg"} top="0%" w="100%" zIndex={-1}> 
               <Image src="leaves.png" position={"relative"} fallbackSrc="leaves.png" left="-80%" maxWidth="120%" zIndex={-1}/>
              </Box>
            </GridItem>
          </Show>

          <Box color="white" mt={8} fontStyle="italic" fontSize="sm" display="grid" gridGap={4}>
          <Text>
              "I feel so much better since my environment is as balanced as it should be!"
           </Text>
           <Text>
              "I've never felt so confident in my abilities and the way I'm able to live my life as I do now!"
           </Text>
           <Text>
              "The bot helped me to overcome so many obstacle that turned out to be just delusions of my mind. Thank you soo much love you guys!!!"
           </Text>
            </Box>

          <Divider mt="8" borderWidth="5" borderColor="white"/>
          <Box pointerEvents={"all"}>
          <Grid templateColumns={{base:"1fr 4fr", md:'1fr 3fr 1fr'}} flexDirection={"row"} gap={2} mt="4" color="white" alignItems="center">
            <GridItem>
               <Image src="logo-4-fullscreen.png" w="100%" borderRadius="full" minH="10" minW="10"/>
              </GridItem>
              <GridItem ml="1">
                <Heading size="md"> Daily Uplift</Heading>
                <Text size="sm"> {users} Users</Text>
              </GridItem>
              <Show below='md'>
                <GridItem/>
              </Show>
              <GridItem>
              <SimpleGrid templateColumns={"1fr 1fr 1fr"} flexDirection={"row"} gap={1}>
                  <GridItem><Link href="https://magikarp.com/" isExternal><Button> Invite</Button></Link></GridItem>
                  <GridItem><Link href="https://magikarp.com/" isExternal><Button> Vote</Button></Link> </GridItem>
                  <GridItem> <Button onClick={handleCopyLink}> {icon} </Button></GridItem>
              </SimpleGrid> </GridItem>
            </Grid>
            <Divider mt="4" borderWidth="5" borderColor="white"/>

           <Heading color="white" mt={8} size="md" fontWeight="normal">
               Common Questions
          </Heading>
           <Accordion allowMultiple color="white" mt={4}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left' fontStyle={"italic"}>
                How do I add the bot to my Discord Server?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={"light"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' fontStyle={"italic"}>
                    Can I customize the message the bot sends me?
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize='12px' />
                    ) : (
                      <AddIcon fontSize='12px' />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontWeight={"light"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
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
</svg>
     */}
    </Flex>
  </ChakraProvider>
  );
}

export default App;
