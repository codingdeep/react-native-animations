import React from 'react';
import {Box, Text, VStack} from 'native-base'
import Svg, {Path} from "react-native-svg";
import {Dimensions} from "react-native";
import StrokeAnimation from "./stroke-animation";

const Wave: React.FC<{}> = () => {
    return (
        <VStack justifyContent="space-between" flex={1} bg="#ddd">
            <Box bg="#0099ff" h={35}>
                <Svg width={Dimensions.get('window').width} height={150} viewBox="0 0 1440 320">
                    <Path
                        fill="#0099ff"
                        d="M0,160L48,186.7C96,213,192,267,288,256C384,245,480,171,576,144C672,117,768,139,864,170.7C960,203,1056,245,1152,224C1248,203,1344,117,1392,74.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"/>
                </Svg>
            </Box>


            <Box alignItems="center">
                <StrokeAnimation />
            </Box>


            <Box height={30} bg="#0099ff">
                <Svg
                    style={{position: 'absolute',bottom: 20}}
                    width={Dimensions.get('window').width} height={150} viewBox="0 0 1440 100">
                    <Path
                        fill="#0099ff"
                        d="M0,320L30,266.7C60,213,120,107,180,80C240,53,300,107,360,144C420,181,480,203,540,202.7C600,203,660,181,720,154.7C780,128,840,96,900,74.7C960,53,1020,43,1080,53.3C1140,64,1200,96,1260,138.7C1320,181,1380,235,1410,261.3L1440,288L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"/>
                </Svg>
            </Box>
        </VStack>
    )
}
export default Wave
