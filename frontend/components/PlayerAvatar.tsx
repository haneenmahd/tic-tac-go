import Avatar, { AvatarProps } from "boring-avatars";

interface PlayerAvatarProps {
    name: string
    size?: string | number
}

export default function PlayerAvatar(props: PlayerAvatarProps) {
    const avatarProps: AvatarProps = {
        variant: "beam",
        colors: ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"],
    };

    return (
        <Avatar
            size={props.size ? props.size : "100%"}
            name={props.name}
            {...avatarProps}
        />
    );
}