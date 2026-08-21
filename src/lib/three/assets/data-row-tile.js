export const DATA_ROW_TILE_ASSET=Object.freeze({id:'qx-data-row-tile',version:1,status:'AI_DRAFT',units:'metres',recordFields:['id','columnCount','colour']});

export function createDataRowTile(THREE,record){
  if(!record||!DATA_ROW_TILE_ASSET.recordFields.every(field=>record[field]!==undefined))throw new Error('Data row tile requires id, columnCount and colour.');
  const root=new THREE.Group();root.name=`${DATA_ROW_TILE_ASSET.id}:${record.id}`;root.userData.asset=DATA_ROW_TILE_ASSET;root.userData.record=Object.freeze({...record});
  const materials={body:new THREE.MeshStandardMaterial({color:record.colour,roughness:.6}),edge:new THREE.MeshStandardMaterial({color:0x28251f,roughness:.62}),cell:new THREE.MeshStandardMaterial({color:0xf4efe5,roughness:.78}),light:new THREE.MeshStandardMaterial({color:0xe2a42d,emissive:0xe2a42d,emissiveIntensity:.35})};
  const add=(name,size,pos,mat)=>{const mesh=new THREE.Mesh(new THREE.BoxGeometry(...size),mat);mesh.name=name;mesh.position.set(...pos);mesh.castShadow=true;root.add(mesh);return mesh};
  add('row-body',[3.0,.16,.34],[0,0,0],materials.body);add('row-spine',[.16,.2,.36],[-1.42,0,0],materials.edge);
  const count=Math.max(2,Math.min(6,record.columnCount));const width=2.55/count;
  for(let i=0;i<count;i+=1)add(`cell-${i}`,[width-.05,.035,.21],[-1.16+width/2+i*width,.1,0],materials.cell);
  const indicator=add('row-indicator',[.1,.045,.1],[1.34,.12,0],materials.light);
  function setState(state='idle'){const colours={idle:0xe2a42d,error:0xc83c2c,resolved:0x63b13b};const colour=colours[state]||colours.idle;materials.light.color.setHex(colour);materials.light.emissive.setHex(colour)}
  const dispose=()=>{root.traverse(o=>o.geometry?.dispose());Object.values(materials).forEach(m=>m.dispose())};
  return {group:root,record:root.userData.record,footprint:Object.freeze({width:3.0,depth:.36,height:.2}),parts:{indicator},attachment:name=>root.getObjectByName(name),setState,dispose};
}
