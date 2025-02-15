import React, { FC, useEffect, useState } from 'react';
import { Image } from "react-native";
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../RootStackParams';
import BehaviorLabel from "../../components/BehaviorLabel"
import BehaviorTimeline from "../../components/BehaviorTimeline"
import * as style from "./style"
import {getCalendarDiary} from "../../api/parents"

// type registerScreenProp = StackNavigationProp<RootStackParamList, 'Register'>;

const BabyDiary: FC = (props) => {
    // const navigation = useNavigation<registerScreenProp>();
    const [checked, setChecked] = useState(false);
    const [date, setDate] = useState('');
    const [issue, setIssue] = useState({
        CalendarDiary: {
            issue: ""
        },
        CalendarImageList : []
    });
    // const { navigation } = props;
    useEffect(() => {
        if(props.route.params)
            setDate(props.route.params.dateString)
        else {
            var today = new Date()
            const year = today.getFullYear()
            const month = today.getMonth() + 1
            const date = today.getDate()
            setDate(`${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`)
        }
    }, [props])

    useEffect(() => {
        getCalendarDiary(1, {date}, setIssue)
    }, [date])

    return (
        <style.scrollViewContainer>
            <style.DiaryContainer>
                <style.BabyBehaviorContainer>
                    <style.BabyBehaviorContainerTitle>[{date}] 아기 행동패턴</style.BabyBehaviorContainerTitle>
                    <style.BabyBehaviorContainerLabels>
                        <BehaviorLabel label="밥" main_color='#F59E0B' second_color='#FFFBEB'/>
                        <BehaviorLabel label="잠" main_color='#AEC4BA' second_color='#DDE9E7'/>
                        <BehaviorLabel label="목욕" main_color='#DC2626' second_color='#FEF2F2'/>
                        <BehaviorLabel label="기타" main_color='#4A4A4A' second_color='#F6F6F6'/>
                    </style.BabyBehaviorContainerLabels>
                    <style.BabyBehaviorContainerTimeline>
                        <BehaviorTimeline label="밥을 먹었어요" main_color='#F59E0B' second_color='#FFFBEB' is_image={true}/>
                        <BehaviorTimeline label="잠을 잤어요" main_color='#AEC4BA' second_color='#DDE9E7' is_image={true}/>
                        <BehaviorTimeline label="목욕을 했어요" main_color='#DC2626' second_color='#FEF2F2' is_image={false}/>
                        <BehaviorTimeline label="똥을 쌌어요" main_color='#4A4A4A' second_color='#F6F6F6' is_image={true}/>
                    </style.BabyBehaviorContainerTimeline>
                </style.BabyBehaviorContainer>
                <style.BabyDiaryContainer>
                    <style.BabyBehaviorContainerTitle>오늘의 아기 일기</style.BabyBehaviorContainerTitle>
                    <style.BabyDiaryContent>
                        <style.BabyDiaryContentText>
                            {issue ? issue.CalendarDiary.issue : "오늘의 일기가 없어요."}
                        </style.BabyDiaryContentText>
                        {
                            issue.CalendarImageList ? 
                            issue.CalendarImageList.map((e, i) => {
                                return (
                                    <Image 
                                        source={{uri : "https://icare-s3.s3.amazonaws.com/" + e.image}}
                                        style = {{width: 300, height: 300}}
                                    />
                                )
                            }) : null

                        }
                    </style.BabyDiaryContent>
                </style.BabyDiaryContainer>
            </style.DiaryContainer>
        </style.scrollViewContainer>
    );
}

export default BabyDiary;