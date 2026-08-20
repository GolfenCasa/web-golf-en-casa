// Generación STL directa para Bambu Studio.
// Evita la extrusión SVG de 10 mm y los problemas de interpretación de paths.



function facet(a,b,c) {
  const ux=b[0]-a[0], uy=b[1]-a[1], uz=b[2]-a[2];
  const vx=c[0]-a[0], vy=c[1]-a[1], vz=c[2]-a[2];
  const nx=uy*vz-uz*vy, ny=uz*vx-ux*vz, nz=ux*vy-uy*vx;
  const len=Math.hypot(nx,ny,nz)||1;
  return `facet normal ${nx/len} ${ny/len} ${nz/len}\n outer loop\n  vertex ${a.join(' ')}\n  vertex ${b.join(' ')}\n  vertex ${c.join(' ')}\n endloop\nendfacet\n`;
}

function boxFacets(x0,y0,z0,x1,y1,z1) {
  const p=[
    [x0,y0,z0],[x1,y0,z0],[x1,y1,z0],[x0,y1,z0],
    [x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1]
  ];
  const f=[[0,2,1],[0,3,2],[4,5,6],[4,6,7],[0,1,5],[0,5,4],[1,2,6],[1,6,5],[2,3,7],[2,7,6],[3,0,4],[3,4,7]];
  return f.map(t=>facet(p[t[0]],p[t[1]],p[t[2]])).join('');
}

export function createBaseStl(diameterMm, heightMm=3.2, segments=160) {
  const r=diameterMm/2;
  let s='solid golfencasa_base\n';
  const bot=[0,0,0], top=[0,0,heightMm];
  for(let i=0;i<segments;i++) {
    const a=2*Math.PI*i/segments, b=2*Math.PI*(i+1)/segments;
    const p0=[r*Math.cos(a),r*Math.sin(a),0], p1=[r*Math.cos(b),r*Math.sin(b),0];
    const q0=[p0[0],p0[1],heightMm], q1=[p1[0],p1[1],heightMm];
    s+=facet(bot,p1,p0)+facet(top,q0,q1)+facet(p0,p1,q1)+facet(p0,q1,q0);
  }
  return s+'endsolid golfencasa_base\n';
}

export function createQrStl(qr, qrAreaMm, quietModules=4, z0=3.0, z1=3.4) {
  const count=qr.modules.size;
  const total=count+quietModules*2;
  const moduleMm=qrAreaMm/total;
  const qrBlackMm=count*moduleMm;
  const origin=-qrBlackMm/2;
  let s='solid golfencasa_qr\n';
  for(let row=0;row<count;row++) {
    let col=0;
    while(col<count) {
      if(!qr.modules.get(row,col)) { col++; continue; }
      const start=col;
      while(col+1<count && qr.modules.get(row,col+1)) col++;
      const x0=origin+start*moduleMm, x1=origin+(col+1)*moduleMm;
      const y0=origin+(count-row-1)*moduleMm, y1=y0+moduleMm;
      s+=boxFacets(x0,y0,z0,x1,y1,z1);
      col++;
    }
  }
  return s+'endsolid golfencasa_qr\n';
}

export async function createLogoStl(diameterMm, z0=0, z1=0.2) {
  const response=await fetch('/brand/logo-v4-1-geometry.json',{cache:'force-cache'});
  if(!response.ok) throw new Error('No se pudo cargar Logo V4.1');
  const geometry=await response.json();
  const scale=diameterMm, tx=-diameterMm/2, ty=-diameterMm/2;
  let s='solid golfencasa_logo_v4_1\n';
  for(const tri of geometry.triangles){
    const a=[tx+tri[0][0]*scale,ty+tri[0][1]*scale,z0],b=[tx+tri[1][0]*scale,ty+tri[1][1]*scale,z0],c=[tx+tri[2][0]*scale,ty+tri[2][1]*scale,z0];
    s+=facet(a,c,b); const A=[a[0],a[1],z1],B=[b[0],b[1],z1],C=[c[0],c[1],z1]; s+=facet(A,B,C);
  }
  for(const ring of geometry.rings) for(let i=0;i<ring.length;i++){
    const p=ring[i],q=ring[(i+1)%ring.length],a=[tx+p[0]*scale,ty+p[1]*scale,z0],b=[tx+q[0]*scale,ty+q[1]*scale,z0],A=[a[0],a[1],z1],B=[b[0],b[1],z1];
    s+=facet(a,b,B)+facet(a,B,A);
  }
  return s+'endsolid golfencasa_logo_v4_1\n';
}

export function downloadStl(filename, text) {
  const blob=new Blob([text],{type:'model/stl'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download=filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
