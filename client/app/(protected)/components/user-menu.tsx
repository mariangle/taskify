import {  
    Dropdown,  
    DropdownTrigger,  
    DropdownMenu,  
    DropdownSection,
    DropdownItem
} from "@nextui-org/react";
import { FaCog, FaUser, FaPalette, FaChartArea, FaSignOutAlt} from "react-icons/fa";
import { RiLifebuoyLine } from "react-icons/ri";
import AuthService from "@/helpers/services/auth-service";
const authService = new AuthService(); 

const UserProfileDropdown = () => {
    const profileItems = [
        { label: 'Analytics', key: 'analytics', icon: <FaChartArea />, href: '/analytics' },
    ];
    const settingsItems = [
        { label: 'Account', key: 'account', icon: <FaUser />, href: '/settings/account' },
        { label: 'General', key: 'general', icon: <FaCog />, href: '/settings/general' },
        { label: 'Appearance', key: 'settings', icon: <FaPalette />, href: '/settings/appearance' },
    ];
    const otherItems = [
        { label: 'Support', key: 'support', icon: <RiLifebuoyLine />, href: '/support' },
    ];
    const onLogout = async () => {
        await authService.logout();
    }

    return (
        <Dropdown>
            <DropdownTrigger>
            🥵
            </DropdownTrigger>
            <DropdownMenu aria-label="User Menu" className="dark:text-white">
                <DropdownSection title="Profile" showDivider>  
                    {profileItems.map((item) => (
                        <DropdownItem key={item.key} href={item.href} startContent={item.icon}>
                            {item.label}
                        </DropdownItem>
                    ))}
                </DropdownSection>
                <DropdownSection title="Settings" showDivider>  
                    {settingsItems.map((item) => (
                        <DropdownItem key={item.key} href={item.href} startContent={item.icon}>
                            {item.label}
                        </DropdownItem>
                    ))}
                </DropdownSection>
                <DropdownSection showDivider>  
                    {otherItems.map((item) => (
                        <DropdownItem key={item.key} href={item.href} startContent={item.icon}>
                            {item.label}
                        </DropdownItem>
                    ))}
                </DropdownSection>
                <DropdownItem textValue="signout" onClick={onLogout} startContent={<FaSignOutAlt />}>
                    Sign Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default UserProfileDropdown;
