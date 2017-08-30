import styled from 'styled-components'
import styles from '/const/styles'


export const DropDown = styled.div`
position: relative;
z-index: 1;
`

export const DropDownMenu = styled.div`
position: absolute;
background: white;
box-shadow: 0 1px 5px 0 rgba(0,0,0,0.25);
border-radius: 3px;
display:${props=>props.visible?'block':'none'};
left:${props=>props.left};
right:${props=>props.right};
top:${props=>props.top};
`

export const DropDownItem = styled.div`
padding: 10px 20px;
font-size: 13px;
color: ${props=>props.disabled ? styles.color.disabled : styles.color.front1};
border-top: 1px solid ${styles.color.background4};
width: 90px;
text-align: left;
&:first-child {
    border-top: 0
}
&:hover {
    background-color: ${props=>props.disabled ? 'white' : styles.color.background1};
    color: ${props=>props.disabled ? styles.color.disabled : styles.color.background2}
}

`

export const DropDownArrow = styled.span`
display: inline-block;
vertical-align: middle;
border-left: 6px solid transparent;
border-right: 6px solid transparent;
border-top: 7px solid ${styles.color.front1};
margin-top: -2px;
`