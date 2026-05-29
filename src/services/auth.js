import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import handlebars from 'handlebars';
import { sendEmail } from '../utils/sendMail.js';

import { v4 as uuid } from 'uuid';

import { Session } from '../models/session.js';

import {
  FIFTEEN_MINUTES,
  ONE_DAY,
} from '../constants/time.js';

export const createSession = async (userId) => {
  const accessToken = uuid();
  const refreshToken = uuid();

  const session = await Session.create({
    userId,

    accessToken,
    refreshToken,

    accessTokenValidUntil:
      new Date(Date.now() + FIFTEEN_MINUTES),

    refreshTokenValidUntil:
      new Date(Date.now() + ONE_DAY),
  });

  return session;
};

export const setSessionCookies = (
  res,
  session,
) => {
  res.cookie(
    'accessToken',
    session.accessToken,
    {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: FIFTEEN_MINUTES,
    },
  );

  res.cookie(
    'refreshToken',
    session.refreshToken,
    {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ONE_DAY,
    },
  );

  res.cookie(
    'sessionId',
    session._id.toString(),
    {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ONE_DAY,
    },
  );
};