import { useBox, useSphere, useCylinder, useConvexPolyhedron, ConvexPolyhedronArgs } from "@react-three/cannon";
import React from "react";
import { IcosahedronGeometry } from "three";
import CannonUtils from "./utils/CannonUtils";

export interface CollaiderPriops {
  children: React.ReactNode;
  type: "Dynamic" | "Static";
  mass: number;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export interface useSphereCollaiderProps {
  args: [number];
  type: "Dynamic" | "Static";
  mass: number;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}
interface BoxCollaider extends CollaiderPriops {
  args: [number, number, number];
  ref: React.Ref<any>;
}

interface SphereCollaider extends CollaiderPriops {
  args: [number];
}

interface CylinderCollaider extends CollaiderPriops {
  args: [number, number, number];
}

interface IcosahedronCollaider extends CollaiderPriops {
  args: number;
  detail: number;
}

export const Collaider = ({
  children,
  type,
  mass,
  position,
  rotation,
  scale,
  args,
  ref,
}: BoxCollaider) => {
    const [boxCollaider, boxCollaiderAPI] = useBox<any>(() => ({
        type,
        args: [...args],
        mass,
        position: [...position],
        rotation: [...rotation],
        scale: [...scale],
        ref
    }))
  return <group ref={boxCollaider}>{children}</group>;
};


export const SphereCollaider = ({
  children,
  type,
  mass,
  position,
  rotation,
  scale,
  args,
}: SphereCollaider) => {
    const [sphereCollaider, sphereCollaiderAPI] = useSphere<any>(() => ({
        type,
        args: [...args],
        mass,
        position: [...position],
        rotation: [...rotation],
        scale: [...scale],
    }))
  return <group ref={sphereCollaider}>{children}</group>;
};


export const CylinderCollaider = ({
  children,
  type,
  mass,
  position,
  rotation,
  scale,
  args,
}: CylinderCollaider) => {
    const [cylinderCollaider, cylinderCollaiderAPI] = useCylinder<any>(() => ({
        type,
        args: [...args],
        mass,
        position: [...position],
        rotation: [...rotation],
        scale: [...scale],
    }))
  return <group ref={cylinderCollaider}>{children}</group>;
}


export const IcosahedronCollaider = ({
  children,
  type,
  mass,
  position,
  rotation,
  scale,
  args,
  detail
}: IcosahedronCollaider) => {
    const geometry = React.useMemo(() => new IcosahedronGeometry(args, detail), [])
    const argss = React.useMemo(() => CannonUtils.toConvexPolyhedronProps(geometry), [geometry])

    const [icosphere, icosphereAPI] = useConvexPolyhedron<any>(() => ({
        type,
        args: argss as ConvexPolyhedronArgs,
        mass,
        position: [...position],
        rotation: [...rotation],
        scale: [...scale],
    }))
  return <group ref={icosphere} position={position}>{children}</group>;
}

export function useSphereCollaider({ type, args, mass, position, rotation, scale }: useSphereCollaiderProps) {
  const [sphereCollaider, sphereCollaiderAPI] = useSphere<any>(() => ({
    type: type,
    args: [...args],
    mass: mass,
    position: [...position],
    scale: [...scale],
    rotation: [...rotation],
  }));

  return {
    sphereCollaiderRef: sphereCollaider as any,
    sphereCollaiderAPI,
  };
}