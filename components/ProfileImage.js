import React from 'react';

import { Image } from 'react-native';

const ProfileImage = ({ portrait, style, height, width }) => <Image style={style} source={{ uri: portrait, width, height }}></Image>;

ProfileImage.defaultProps = {
  height: 200,
  width: 200
};

export { ProfileImage };
