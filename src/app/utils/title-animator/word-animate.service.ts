import { Injectable } from '@angular/core';
type D3Selection = d3.Selection<d3.BaseType, any, d3.BaseType, undefined>;

@Injectable({
  providedIn: 'root'
})
export class WordAnimateService {

  constructor() { }

   renderTitle( title: string, container ) {
    const titleLetters = title.split('');
    const tempTitleContainer = container.select('.temp-title').html('');
    const oldTitleContainer = container.select('.current-title');
    this.appendText(titleLetters, tempTitleContainer);

    // set initial position for animation based on previous set of characters
    // if new character can be found in previous text we move it to its position so then we can move it back
    // to its default position creating effect of shifting letters
    tempTitleContainer.selectAll('span')
      .style('transform', ( d: any, idx: number, els: HTMLElement[] ) => {
        const findInOld = oldTitleContainer.select('span.letter-' + d.letter);
        const oldEL = findInOld.node() as HTMLElement;
        const { x: xRel, y: yRel } = oldEL && this.getRelativePosition(els[ idx ], oldEL) || { x: 0, y: 0 };
        // console.log(oldEL, '???', xRel , '', title );
        const scale = oldEL ? 1 : 0;
        return `translate(${xRel}px,${yRel}px)scale(${scale})`;
      });


    oldTitleContainer.selectAll('span')
      .transition()
      .duration(700)
      .style('transform', 'scale(0)')
      .style('opacity', 0);


    tempTitleContainer.selectAll('span')
      .transition()
      .duration(1500)
      .style('transform', 'translate(0,0)scale(1)')
      .style('opacity', 1)
      .on('end', () => {
        oldTitleContainer.html('');
      });

    // swapping classes so that temp title becomes current title
    // and current title(which is an old one) becomes a new one ready for new animation
    oldTitleContainer.classed('current-title', false).classed('temp-title', true);
    tempTitleContainer.classed('temp-title', false).classed('current-title', true);
}

private getRelativePosition( el1: HTMLElement, el2: HTMLElement ): { x: number, y: number } {
  const x = el2.getBoundingClientRect().left - el1.getBoundingClientRect().left;
  const y = el1.getBoundingClientRect().top - el2.getBoundingClientRect().top;
  return { x, y };
}

private appendText( letters: string[], container: D3Selection ): void {
  letters.forEach(( letter: string ) => {
    container.append('span')
      .style('display', 'inline-block')
      .style('width', letter === ' '? '1rem': '')
      .text(letter.toUpperCase())
      .classed('letter-' + letter.toUpperCase(), true)
      .datum<{ letter: string }>({ letter: letter.toUpperCase() });
  });
}

}
