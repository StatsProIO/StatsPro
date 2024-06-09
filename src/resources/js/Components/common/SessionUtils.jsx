import Tooltip from "@mui/material/Tooltip";
import LanguageIcon from "@mui/icons-material/Language";
import AndroidIcon from "@mui/icons-material/Android";
import getCountryISO2 from "country-iso-3-to-2";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import TheatersIcon from "@mui/icons-material/Theaters";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import TvIcon from "@mui/icons-material/Tv";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import React from "react";
import freeBSDLogo from 'super-tiny-icons/images/svg/freebsd.svg';
import linuxLogo from 'super-tiny-icons/images/svg/linux.svg';
import macOsLogo from 'super-tiny-icons/images/svg/macos.svg';
import ubuntuLogo from 'super-tiny-icons/images/svg/ubuntu.svg';
import windowsLogo from 'super-tiny-icons/images/svg/windows.svg';
import appleLogo from 'super-tiny-icons/images/svg/apple.svg';
import chromeLogo from 'super-tiny-icons/images/svg/chrome.svg';
import edgeLogo from 'super-tiny-icons/images/svg/edge.svg';
import firefoxLogo from 'super-tiny-icons/images/svg/firefox.svg';
import googleLogo from 'super-tiny-icons/images/svg/google.svg';
import operaLogo from 'super-tiny-icons/images/svg/opera.svg';
import safariLogo from 'super-tiny-icons/images/svg/safari.svg';
import samsungInternetLogo from 'super-tiny-icons/images/svg/samsung_internet.svg';

export function osToIcon(os) {

    if(os === null) {
        return <Tooltip title="Unknown OS"><LanguageIcon/></Tooltip>;
    }

    if (os.includes('Android')) {
        return <Tooltip title="Android"><AndroidIcon/></Tooltip>;
    }

    if (os.includes('Chrome')) {
        return <Tooltip title="Chrome OS"><img src={chromeLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    if (os.includes('FreeBSD')) {
        return <Tooltip title="FreeBSD"><img src={freeBSDLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    if (os.includes('Linux')) {
        return <Tooltip title="Linux"><img src={linuxLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    if (os.includes('OS X')) {
        return <Tooltip title="OS X"><img src={macOsLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    if (os.includes('Ubuntu')) {
        return <Tooltip title="Ubuntu"><img src={ubuntuLogo} width={'25px'} style={{borderRadius: '10px'}} /></Tooltip>;
    }

    if (os.includes('Windows')) {
        return <Tooltip title="Windows"><img src={windowsLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    if (os.includes('iOS')) {
        return <Tooltip title="iOS"><img src={appleLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    return <Tooltip title="Unknown OS"><LanguageIcon/></Tooltip>;

}

export function countryToIcon(countryCode) {
    if (!countryCode) {
        return <Tooltip title={"Unknown country"}><div>🏳</div></Tooltip>;
    }

    let twoLetterCountryCode = getCountryISO2(countryCode);

    if (!twoLetterCountryCode) {
        return <Tooltip title={"Unknown country"}><div>🏳</div></Tooltip>;
    }

    const codePoints = twoLetterCountryCode
        .toUpperCase()
        .split('')
        .map(char =>  127397 + char.charCodeAt());
    return <Tooltip title={countryCode}><div>{String.fromCodePoint(...codePoints)}</div></Tooltip>;
}

export function languageCodeToName(languageCode) {
    const languageNames = new Intl.DisplayNames(['en'], {
        type: 'language'
    });

    try {
        return languageNames.of(languageCode);
    } catch (e) {
        console.error("Unable to convert language code to name" + languageCode);
        return 'Unknown';
    }

}

export function deviceToIcon(device) {

    if(device === null) {
        return <Tooltip title="Unknown Device"><DeviceUnknownIcon/></Tooltip>;
    }

    if (device.includes('bot')) {
        return <Tooltip title="Bot"><SmartToyIcon/></Tooltip>;
    }

    if (device.includes('desktop')) {
        return <Tooltip title="Desktop"><DesktopMacIcon /></Tooltip>;
    }

    if (device.includes('gaming')) {
        return <Tooltip title="Gaming Device"><SportsEsportsIcon /></Tooltip>;
    }

    if (device.includes('media')) {
        return <Tooltip title="Media Device"><TheatersIcon /></Tooltip>;
    }

    if (device.includes('mobile')) {
        return <Tooltip title="Mobile Device"><SmartphoneIcon /></Tooltip>;
    }

    if (device.includes('tablet')) {
        return <Tooltip title="Tablet Device"><TabletMacIcon /></Tooltip>;
    }

    if (device.includes('television')) {
        return <Tooltip title="Television"><TvIcon /></Tooltip>;
    }

    return <Tooltip title="Unknown Device"><DeviceUnknownIcon/></Tooltip>;
}

export function browserToIcon(browser) {

    if (browser === null) {
        return <Tooltip title="Unknown Browser"><TravelExploreIcon/></Tooltip>
    }

    if (browser.includes('Chrome')) {
        return <Tooltip title="Chrome"><img src={chromeLogo} width={'25px'} style={{borderRadius: '10px'}} /></Tooltip>;
    }

    if (browser.includes('Edge') || browser.includes('Internet Explorer')) {
        return <Tooltip title="Edge"><img src={edgeLogo} width={'25px'} style={{borderRadius: '10px'}} /></Tooltip>;
    }

    if (browser.includes('Firefox') || browser.includes('Mozilla')) {
        return <Tooltip title="Mozilla Firefox"><img src={firefoxLogo} width={'25px'} style={{borderRadius: '10px'}} /></Tooltip>;
    }

    if (browser.includes('Google')) {
        return <Tooltip title="Google"><img src={googleLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    if (browser.includes('Opera')) {
        return <Tooltip title="Opera"><img src={operaLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    if (browser.includes('Safari')) {
        return <Tooltip title="Safari"><img src={safariLogo} width={'25px'} style={{borderRadius: '10px'}}/></Tooltip>;
    }

    if (browser.includes('Samsung')) {
        return <Tooltip title="Samsung Browser"><img src={samsungInternetLogo} width={'25px'} style={{borderRadius: '10px'}} /></Tooltip>;
    }

    return <Tooltip title="Unknown Browser"><TravelExploreIcon/></Tooltip>
}
