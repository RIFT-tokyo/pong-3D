import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import threeFontJson from 'three/examples/fonts/helvetiker_bold.typeface.json';
import { ThreeEvent } from '@react-three/fiber';

const Text: React.VFC<{ position: [number, number, number], text: string, onClick?: ((event: ThreeEvent<MouseEvent>) => void) }> = ({ position, text, onClick }) => {
	// 位置の調整
	const textGeo = new TextGeometry(text, {
			font: new FontLoader().parse(threeFontJson),
			size: 4,
			height: 1,
	})
	textGeo.computeBoundingBox()
	const centerOffset = -(textGeo.boundingBox!.max.x - textGeo.boundingBox!.min.x) / 2

	return (
		<mesh position={[position[0] + centerOffset, position[1], position[2]]} args={[textGeo]} castShadow receiveShadow onClick={onClick}>
			<meshPhongMaterial color="gray" />
		</mesh>
	)
}

export default Text;