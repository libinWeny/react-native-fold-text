/**
 * Created by YASIN on 2017/8/21.
 * 字数超过自指定行数后显示更多
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet, TouchableOpacity,
} from 'react-native';

export default class index extends Component {

    static defaultProps = {
        maxLines : 5,
    };

    state = {
        maxHeight : null,                       // 测量得到的文字的高度
        maxLines : null,                        // 文字numberOfLines 属性的值
        show : false,                           // 控制是否显示更多的箭头
        text : this.props.text,                 // 文字内容
    };

    _changeLines(maxLines) {
        // 如果 maxLines 存在 说明是折叠状态，取消行数限制 显示全部文字
        if (maxLines) {
            this.setState({ maxLines : null })
        } else {
            this.setState({ maxLines : this.props.maxLines })
        }
    }

    _onTextLayout = (event) => {
        let height = event.nativeEvent.layout.height;
        //第一次测量view的最大高度
        if (this.state.maxHeight === null && this.props.maxLines) {
            this.setState({
                maxLines : this.props.maxLines,
                maxHeight : height
            }, () => console.log(this.state.maxLines));
            //第二次当测量的最大高度>设置行数后的高度的时候 显示展开全部的按钮
        } else if (this.props.maxLines) {
            this.setState({ show : true })
        }
    };

    render() {
        const { text, show, maxLines } = this.state;
        return (
            <View>
                <Text
                    style={[ styles.text, this.props.style ]}
                    numberOfLines={maxLines}
                    onLayout={this._onTextLayout}
                >
                    {text}
                </Text>

                {
                    show ?
                        <TouchableOpacity
                            onPress={() => this._changeLines(maxLines)}
                            style={{ alignItems : 'center', height : 40, justifyContent : 'center', backgroundColor : 'yellow' }}>
                            <Icon name={maxLines ? 'oneIcon|icon_arrow_down' : 'oneIcon|icon_arrow_up'} size={FS.ICON_B} color={CS.THEME11}/>
                        </TouchableOpacity>
                        : null
                }

            </View>
        );
    }
}
const styles = StyleSheet.create({
    text : {
        fontSize : 14,
        color : '#555555',
        lineHeight : 20,
        paddingHorizontal : 15,
        marginTop : 10,
    }
});