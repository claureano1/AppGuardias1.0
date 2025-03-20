/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Styles } from './Styles.js';

export default class AboutScreen extends React.Component {
    render() {
        return (
            <View style={Styles.contentWrapper}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={Styles.negocioInfo}>
                        <Text style={Styles.listText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin facilisis dictum tellus, vel consequat turpis rutrum et. Praesent ac scelerisque tellus, auctor consectetur ex. Nullam cursus magna nec ipsum gravida malesuada. Donec in bibendum ante. Quisque lacinia elit est, id accumsan felis condimentum sed. Cras viverra neque vel imperdiet efficitur. Vestibulum justo risus, scelerisque vitae mauris ac, eleifend pretium risus. Morbi facilisis elementum felis, id venenatis leo euismod ac. Nulla in sagittis neque, id auctor nibh. Fusce aliquet dui eget ex ullamcorper consectetur. Sed ex dui, finibus sed nunc a, congue fringilla massa. Etiam condimentum eu lacus ac vestibulum. Mauris tristique dolor non semper fringilla. Sed nulla metus, laoreet at viverra in, euismod imperdiet libero. Mauris et erat nisl.
                        </Text>

                        <Text style={Styles.listText}>
                            Maecenas venenatis felis et elementum interdum. Duis faucibus eleifend fringilla. Curabitur sed nisl sagittis velit mattis sollicitudin. Fusce felis nibh, sodales eget urna et, gravida commodo sem. Praesent commodo elit accumsan, venenatis massa sed, ornare purus. Nulla maximus tellus justo, ut gravida felis faucibus non. Vivamus suscipit congue nulla, non tincidunt nibh lacinia imperdiet. Quisque cursus tempus porttitor. Integer commodo consequat mollis.
                        </Text>

                        <Text style={Styles.listText}>
                            Nulla vehicula condimentum auctor. In efficitur neque pellentesque lorem porta, convallis imperdiet augue pulvinar. Praesent pharetra malesuada tortor. Nulla libero leo, lobortis ut placerat at, interdum vitae mauris. Quisque vehicula cursus augue ac placerat. Proin sit amet porta sem, id commodo odio. Aenean pharetra risus ut facilisis tincidunt. Curabitur eget augue eu ante accumsan dapibus ac sed enim.
                        </Text>

                        <Text style={Styles.listText}>
                            Aliquam lacinia, metus eget commodo lobortis, tellus diam mattis nunc, id porttitor ex tellus nec arcu. Aliquam erat volutpat. Ut ac aliquet arcu. Vivamus iaculis mollis rutrum. Nunc ornare accumsan lorem at vehicula. Vivamus vitae laoreet lectus, quis egestas erat. Vestibulum a fringilla augue. Donec placerat massa quis nulla finibus luctus. Donec sed justo ac enim pellentesque dapibus in scelerisque velit. Nulla ut nisi vitae est aliquam laoreet. Quisque varius enim at erat congue, non facilisis ante sodales. Phasellus faucibus placerat dui ut vehicula. Nullam sed suscipit mauris, ut rutrum augue. Pellentesque quis elit nunc. Suspendisse quis efficitur dolor.
                        </Text>

                        <Text style={Styles.listText}>
                            Morbi cursus placerat dictum. Donec convallis condimentum lectus, nec scelerisque turpis dapibus non. Donec vel pellentesque lacus. Aliquam semper ac dui imperdiet finibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam ipsum mi, gravida quis porttitor sed, blandit ut odio. Cras accumsan et ligula et facilisis. Cras eu lectus massa.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
