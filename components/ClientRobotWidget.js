'use client';

import dynamic from 'next/dynamic';

const RobotChatWidget = dynamic(() => import('@/components/RobotChatWidget'), { ssr: false });

export default function ClientRobotWidget() {
  return <RobotChatWidget />;
}
