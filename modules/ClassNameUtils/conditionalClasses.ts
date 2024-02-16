interface ConditionalClass {
	getClass(): string;
}

export class GatedClass implements ConditionalClass {
	private className: string;
	private gate: boolean | (() => boolean);

	constructor(className: string, gate: boolean | (() => boolean)) {
		this.className = className;
		this.gate = gate;
	}

	getClass(): string {
		let verdict = false;
		if (typeof this.gate === "function") {
			verdict = this.gate();
		} else {
			verdict = this.gate;
		}

		if (verdict) {
			return this.className;
		}

		return "";
	}
}

export class ToggleClass implements ConditionalClass {
	private activeClassName: string;
	private inActiveClassName: string;
	private gate: boolean | (() => boolean);

	constructor(
		activeClassName: string,
		inActiveClassName: string,
		gate: boolean | (() => boolean)
	) {
		this.activeClassName = activeClassName;
		this.inActiveClassName = inActiveClassName;
		this.gate = gate;
	}

	getClass(): string {
		let verdict = false;
		if (typeof this.gate === "function") {
			verdict = this.gate();
		} else {
			verdict = this.gate;
		}

		if (verdict) {
			return this.activeClassName;
		} else {
			return this.inActiveClassName;
		}
	}
}

export default function conditionalClasses(
	conditionalClassList: ConditionalClass[]
) {
	return conditionalClassList.reduce((a, c) => a + c.getClass() + " ", "");
}
  