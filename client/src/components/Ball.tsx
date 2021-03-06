import { useSphere } from "@react-three/cannon"
import { useTexture } from "@react-three/drei"
import { MutableRefObject, useEffect, useRef } from "react"
import { position } from "../type/position"
import { useFrame } from '@react-three/fiber';

const Ball: React.VFC<{ position: MutableRefObject<position>, started: boolean}> = ({ position, started }) => {
//	const restitution = useRef(1.2)

	const [ ref, api ] = useSphere(() => ({
		mass: 10,
		args: [0.5],
		position: position.current,
		restitution: 1,
		/*
		onCollide: () => {
			restitution.current = Math.max(restitution.current - 0.01, 1.0);
			console.log(restitution.current, ": ", api.velocity.);
		}
		*/
	}))

  const resetBall = () => {
	api.position.set(0, 0.5, 0);
	let x = (Math.random() * Math.PI / 2 + Math.PI / 4) * (Math.random() > 0.5 ? 1 : -1)
	api.velocity.set(22 * Math.cos(x), 0, 22 * Math.sin(x))
  }

	// 得点が入ったらボールをリセットする
  useFrame(() => {
	if (Math.abs(position.current[2]) > 40/2) {
			resetBall();
	  }
  	if (Math.abs(position.current[0]) > 20/2+15) {
			resetBall();
		}
	});

	// ボールの初速度・角度を設定
	useEffect(() => {
		if (started) {
		/* 0 < sin(x) < 1 */
		let x = (Math.random() * Math.PI / 2 + Math.PI / 4) * (Math.random() > 0.5 ? 1 : -1)
		api.velocity.set(22 * Math.cos(x), 0, 22 * Math.sin(x))
		const unsubscribe = api.position.subscribe((v) => {
			position.current = v
		})
		return unsubscribe;
		}
	/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, [started])
	// useEffect(() => {
	// 	// console.log("キタァ: bool: ", started)
	// 	// started && resetBall();
	// 	resetBall();
	// }, [started])

	const property = useTexture({
		map: 'https://blenderartists.org/uploads/default/original/3X/8/1/814a32caf0901716e85e291d2a99018e549373cd.jpg',
	})
	return (
	  <mesh
			position={position.current}
			ref={ref}
		>
			<sphereBufferGeometry args={[0.5, 16, 16]} />
			{/* <meshNormalMaterial wireframe /> */}
			<meshStandardMaterial opacity={0.0} transparent={true} {...property} />
	  </mesh>
	)
}

export default Ball;
