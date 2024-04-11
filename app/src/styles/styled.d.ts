import 'styled-components';

declare module 'style-components'{
    export interface DefaultTheme{      
            title: string;
        
            colors:{
                /* COLORS THEME */
                bgPrimarycolor: string;
                bgSecondarycolor: string;
                bgTertiarycolor: string;
        
                fontPrimarycolor: string;
                fontSecondarycolor: string;
                fontTertiarycolor: string;
        
                alertRedColor: string;
                alertYellowColor: string;
                alertGreenColor: string;
                alertGrayColor: string;
            }
        
    }
}