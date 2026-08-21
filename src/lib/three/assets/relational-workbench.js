export const RELATIONAL_WORKBENCH_ASSET = Object.freeze({
  id:'qx-relational-workbench', version:1, status:'AI_DRAFT', units:'metres',
  footprint:{width:3.8,depth:2.1,height:1.35}, attachmentPoints:['row-slot-0','row-slot-1','row-slot-2','operator-position']
});

export function createRelationalWorkbench(THREE) {
  const root=new THREE.Group(); root.name=RELATIONAL_WORKBENCH_ASSET.id; root.userData.asset=RELATIONAL_WORKBENCH_ASSET;
  const materials={base:new THREE.MeshStandardMaterial({color:0xeee8da,roughness:.74}),edge:new THREE.MeshStandardMaterial({color:0x26231f,roughness:.62}),clay:new THREE.MeshStandardMaterial({color:0xa85a34,roughness:.56}),steel:new THREE.MeshStandardMaterial({color:0x747a75,roughness:.3,metalness:.55}),light:new THREE.MeshStandardMaterial({color:0xe2a42d,emissive:0xe2a42d,emissiveIntensity:.45})};
  const add=(name,size,pos,mat)=>{const mesh=new THREE.Mesh(new THREE.BoxGeometry(...size),mat);mesh.name=name;mesh.position.set(...pos);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);return mesh};
  add('plinth',[3.8,.15,2.05],[0,.075,0],materials.edge); add('cabinet',[3.6,.7,1.9],[0,.5,0],materials.base); add('tabletop',[3.82,.12,2.08],[0,.92,0],materials.clay);
  add('header-rail',[3.28,.16,.34],[0,1.08,-.73],materials.edge);
  const slotLights=[];
  for(let i=0;i<3;i+=1){add(`row-track-${i}`,[3.2,.045,.38],[0,1.02,-.28+i*.51],materials.steel);const light=add(`row-light-${i}`,[.12,.035,.12],[-1.48,1.07,-.28+i*.51],materials.light);slotLights.push(light);const point=new THREE.Object3D();point.name=`row-slot-${i}`;point.position.set(0,1.12,-.28+i*.51);root.add(point)}
  const operator=new THREE.Object3D();operator.name='operator-position';operator.position.set(0,0,1.55);root.add(operator);
  function setStatus(status='idle'){const states={idle:0xe2a42d,error:0xc83c2c,resolved:0x63b13b};const colour=states[status]||states.idle;materials.light.color.setHex(colour);materials.light.emissive.setHex(colour);materials.light.emissiveIntensity=status==='resolved'?.75:.45}
  const dispose=()=>{root.traverse(o=>o.geometry?.dispose());Object.values(materials).forEach(m=>m.dispose())};
  // setState is the shared name; setStatus is kept for existing call sites.
  return {group:root,footprint:RELATIONAL_WORKBENCH_ASSET.footprint,parts:{slotLights},attachment:name=>root.getObjectByName(name),setState:setStatus,setStatus,dispose};
}
